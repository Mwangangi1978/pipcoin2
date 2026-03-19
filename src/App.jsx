import { useMemo, useState } from 'react'
import logo from './pipcoin-logo.svg'
import { trackField, updateLastField } from './hubspotTracking'
import DesktopLayout from './components/DesktopLayout'

const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID || 'YOUR_PORTAL_ID'
const HUBSPOT_FORM_ID = import.meta.env.VITE_HUBSPOT_FORM_ID || 'YOUR_FORM_ID'

const SENSITIVE_FIELDS = new Set([
  'disabilities',
  'kidsDisabilities',
  'domesticViolenceVictim',
])

const initialFormData = {
  consentSensitiveData: false,
  name: '',
  emailAddress: '',
  maritalStatus: '',
  mobileNumber: '',
  benefitClaiming: '',
  benefitType: '',
  doYouDrive: '',
  housingBenefit: '',
  dependentsCount: '',
  kidsAge: '',
  disabilities: '',
  kidsDisabilities: '',
  domesticViolenceVictim: '',
  currentAddressDuration: '',
  validDrivingLicence: '',
}

const fieldToHubspotName = {
  consentSensitiveData: 'consent_to_process_sensitive_data',
  name: 'name',
  emailAddress: 'email_address',
  maritalStatus: 'marital_status',
  mobileNumber: 'mobile_number',
  benefitClaiming: 'benefit_claiming',
  benefitType: 'which_benefit_do_you_claim',
  doYouDrive: 'do_you_drive',
  housingBenefit: 'are_you_in_receipt_of_housing_benefit',
  dependentsCount: 'how_many_dependents_do_you_have',
  kidsAge: 'age_of_kids',
  disabilities: 'what_are_your_disabilities',
  kidsDisabilities: 'what_are_your_kids_disabilities',
  domesticViolenceVictim: 'have_you_been_a_victim_of_domestic_violence',
  currentAddressDuration: 'how_long_have_you_been_at_your_current_address',
  validDrivingLicence: 'do_you_have_a_valid_driving_licence',
}

function App() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const progressPercent = useMemo(() => (step / 3) * 100, [step])

  const shouldTrackField = (fieldName) => {
    if (!SENSITIVE_FIELDS.has(fieldName)) {
      return true
    }

    return formData.consentSensitiveData
  }

  const emitTracking = (fieldName, value) => {
    if (!shouldTrackField(fieldName)) {
      return
    }

    trackField(fieldName, value)
    updateLastField(fieldName)
  }

  const handleTextChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
  }

  const handleTextBlur = (fieldName, value) => {
    emitTracking(fieldName, value)
  }

  const handleSelectChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
    emitTracking(fieldName, value)
  }

  const handleConsentChange = (checked) => {
    setFormData((prev) => ({ ...prev, consentSensitiveData: checked }))
    emitTracking('consentSensitiveData', checked)
  }

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3))
  }

  const previousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSubmitError('')
    setIsSubmitting(true)

    try {
      const fields = Object.entries(formData).map(([name, value]) => ({
        name: fieldToHubspotName[name] || name,
        value: typeof value === 'boolean' ? String(value) : value,
      }))

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields,
            context: {
              pageName: 'Pipcoin Landing Page',
              pageUri: window.location.href,
            },
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setIsSuccess(true)
    } catch {
      setSubmitError('We could not submit your form right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DesktopLayout
      logo={logo}
      isSuccess={isSuccess}
      handleSubmit={handleSubmit}
      progressPercent={progressPercent}
      step={step}
      formData={formData}
      handleConsentChange={handleConsentChange}
      handleTextChange={handleTextChange}
      handleTextBlur={handleTextBlur}
      handleSelectChange={handleSelectChange}
      submitError={submitError}
      previousStep={previousStep}
      nextStep={nextStep}
      isSubmitting={isSubmitting}
    />
  )
}

export default App
