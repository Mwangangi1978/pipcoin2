const getQueue = () => {
  if (typeof window !== 'undefined') {
    window._hsq = window._hsq || []
  }

  if (typeof window === 'undefined' || !Array.isArray(window._hsq)) {
    return null
  }

  return window._hsq
}

export const initHubspotTracking = (portalId) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  if (!portalId || document.getElementById('hs-script-loader')) {
    return
  }

  window._hsq = window._hsq || []

  const script = document.createElement('script')
  script.id = 'hs-script-loader'
  script.async = true
  script.defer = true
  script.src = `https://js.hs-scripts.com/${portalId}.js`
  document.head.appendChild(script)
}

export const getHubspotUtk = () => {
  if (typeof document === 'undefined') {
    return ''
  }

  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('hubspotutk='))

  return match ? decodeURIComponent(match.split('=')[1]) : ''
}

export const trackField = (fieldName, value) => {
  const hsq = getQueue()

  if (!hsq) {
    return
  }

  hsq.push([
    'trackEvent',
    {
      id: 'form_progress',
      value: {
        field_name: fieldName,
        field_value: String(value ?? ''),
      },
    },
  ])
}

export const updateLastField = (fieldName) => {
  const hsq = getQueue()

  if (!hsq) {
    return
  }

  hsq.push([
    'identify',
    {
      last_field_completed: fieldName,
    },
  ])
}