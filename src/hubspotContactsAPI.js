const API_BASE = '/api/hubspot'
const TARGET_LIST_NAME = 'pipcoin'
const TARGET_LIST_ID = String(
  import.meta.env.VITE_HUBSPOT_PIPCOIN_LIST_ID ||
  import.meta.env.VITE_HUBSPOT_LIST_ID ||
  ''
).trim()

const buildUserError = (userMessage, technicalMessage) => {
  const error = new Error(userMessage)
  error.technicalMessage = technicalMessage
  return error
}

const getFriendlyMessageFromStatus = (status) => {
  if (status === 400) {
    return 'Some details look invalid. Please check your answers and try again.'
  }

  if (status === 401 || status === 403) {
    return 'The submission service is currently unavailable. Please try again shortly.'
  }

  if (status === 404) {
    return 'The submission service is temporarily unavailable. Please try again later.'
  }

  if (status === 429) {
    return 'Too many submissions were sent at once. Please wait a moment and try again.'
  }

  if (status >= 500) {
    return 'We are having trouble submitting right now. Please try again in a moment.'
  }

  return 'We could not submit your details right now. Please try again.'
}

export const submitContactToHubSpot = async (formData) => {

  try {
    // Step 1: Create or update contact
    const contact = await createOrUpdateContact(formData)
    const contactId = contact.id

    // Step 2: Resolve the target list and ensure membership.
    const listId = TARGET_LIST_ID || await getExistingListId(TARGET_LIST_NAME)

    if (!listId) {
      throw buildUserError(
        'We could not complete your submission right now. Please try again.',
        `HubSpot list "${TARGET_LIST_NAME}" was not found`
      )
    }

    // Step 3: Add contact to list
    await addContactToList(contactId, listId)

    return { success: true, contactId, listId }
  } catch (error) {
    console.error('HubSpot Contacts API error:', error?.technicalMessage || error)
    throw error
  }
}

async function createOrUpdateContact(formData) {
  const properties = mapFormDataToContactProperties(formData)

  const payload = {
    properties,
  }

  let response

  try {
    response = await fetch(`${API_BASE}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (error) {
    throw buildUserError(
      'We could not connect to the submission service. Please check your internet and try again.',
      error?.message || 'Network error while creating contact'
    )
  }

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('Contact creation failed:', {
      status: response.status,
      body: errorBody,
    })

    let parsedMessage = ''
    try {
      parsedMessage = JSON.parse(errorBody)?.message || ''
    } catch {
      parsedMessage = ''
    }

    throw buildUserError(
      getFriendlyMessageFromStatus(response.status),
      `Failed to create contact (${response.status})${parsedMessage ? `: ${parsedMessage}` : ''}`
    )
  }

  const data = await response.json()
  return data
}

async function getExistingListId(listName) {
  const lists = await fetchAllLists()
  const normalizedTarget = String(listName).trim().toLowerCase()

  const existingList = lists.find((list) => {
    const normalizedName = String(list?.name || '').trim().toLowerCase()
    return normalizedName === normalizedTarget
  })

  return existingList?.listId || existingList?.id || null
}

async function fetchAllLists() {
  const allLists = []
  let after = null

  do {
    const query = after
      ? `?limit=100&after=${encodeURIComponent(after)}`
      : '?limit=100'

    const response = await fetch(`${API_BASE}/crm/v3/lists${query}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw buildUserError(
        getFriendlyMessageFromStatus(response.status),
        `Failed to fetch lists (${response.status})${errorBody ? `: ${errorBody}` : ''}`
      )
    }

    const data = await response.json()
    const page = Array.isArray(data?.results) ? data.results : []
    allLists.push(...page)
    after = data?.paging?.next?.after || null
  } while (after)

  return allLists
}

async function addContactToList(contactId, listId) {
  const payload = [String(contactId)]

  const response = await fetch(
    `${API_BASE}/crm/v3/lists/${listId}/memberships/add`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  )

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('Add to list failed:', {
      status: response.status,
      body: errorBody,
    })
    let parsedMessage = ''
    try {
      parsedMessage = JSON.parse(errorBody)?.message || ''
    } catch {
      parsedMessage = ''
    }

    throw buildUserError(
      getFriendlyMessageFromStatus(response.status),
      `Failed to add contact to list (${response.status})${parsedMessage ? `: ${parsedMessage}` : ''}`
    )
  }

  return true
}

function mapFormDataToContactProperties(formData) {
  const mapping = {
    firstName: 'firstname',
    lastName: 'lastname',
    emailAddress: 'email',
    mobileNumber: 'phone',
    maritalStatus: 'marital_status',
    benefitClaiming: 'benefit_claiming',
    benefitType: 'which_benefit_do_you_claim',
    housingBenefit: 'are_you_in_receipt_of_housing_benefit',
    dependentsCount: 'number_of_dependents',
    domesticViolenceVictim: 'domestic_violence_victim',
    currentAddressDuration: 'current_address_duration',
    validDrivingLicence: 'driving_licence',
    consentSensitiveData: 'consent_to_process_sensitive_data',
  }

  const valueMap = {
    benefitClaiming: {
      Yes: 'yes',
      No: 'no',
    },
    housingBenefit: {
      Yes: 'yes',
      No: 'no',
    },
    domesticViolenceVictim: {
      Yes: 'yes',
      No: 'no',
      'Prefer not to say': 'prefer_not_to_say',
    },
    currentAddressDuration: {
      'Less than 1 year': 'less_than_1_year',
      '1-3 years': 'p_13_years',
      '3-5 years': 'p_35_years',
      '5+ years': 'p_5_years',
    },
    validDrivingLicence: {
      Yes: 'yes',
      No: 'no',
      Expired: 'expired',
    },
  }

  const properties = {}

  Object.entries(formData).forEach(([key, value]) => {
    if (value === '' || value === null || value === undefined) {
      return
    }

    if (key === 'hasDisability') {
      properties.disabilities = value === 'yes'
        ? String(formData.disabilities || '').trim()
        : 'No disability'
      return
    }

    if (key === 'hasKidsDisability') {
      properties.kids_disabilities = value === 'yes'
        ? String(formData.kidsDisabilities || '').trim()
        : 'No disability'
      return
    }

    if (key === 'disabilities' || key === 'kidsDisabilities') {
      return
    }

    const hubspotKey = mapping[key] || key
    const normalizedValue = valueMap[key]?.[value] ?? value
    properties[hubspotKey] = String(normalizedValue)
  })

  return properties
}
