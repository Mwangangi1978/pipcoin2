const getQueue = () => {
  if (typeof window === 'undefined' || !Array.isArray(window._hsq)) {
    return null
  }

  return window._hsq
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