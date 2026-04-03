const HUBSPOT_BASE_URL = 'https://api.hubapi.com'

const getForwardHeaders = (req) => {
  const headers = {
    Authorization: `Bearer ${process.env.HUBSPOT_SERVICE_KEY || ''}`,
  }

  const contentType = req.headers['content-type']
  if (contentType) {
    headers['Content-Type'] = contentType
  }

  return headers
}

const buildHubSpotUrl = (req) => {
  const pathParts = Array.isArray(req.query.path)
    ? req.query.path
    : req.query.path
      ? [req.query.path]
      : []

  const query = new URLSearchParams()

  Object.entries(req.query || {}).forEach(([key, value]) => {
    if (key === 'path') {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, String(item)))
      return
    }

    if (value !== undefined && value !== null) {
      query.append(key, String(value))
    }
  })

  const path = pathParts.join('/')
  const qs = query.toString()

  return `${HUBSPOT_BASE_URL}/${path}${qs ? `?${qs}` : ''}`
}

const getBody = (req) => {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return undefined
  }

  if (req.body === undefined || req.body === null) {
    return undefined
  }

  if (typeof req.body === 'string') {
    return req.body
  }

  return JSON.stringify(req.body)
}

export default async function handler(req, res) {
  const serviceKey = process.env.HUBSPOT_SERVICE_KEY

  if (!serviceKey) {
    res.status(500).json({
      message: 'Server is missing HUBSPOT_SERVICE_KEY',
    })
    return
  }

  const targetUrl = buildHubSpotUrl(req)

  try {
    const upstreamResponse = await fetch(targetUrl, {
      method: req.method,
      headers: getForwardHeaders(req),
      body: getBody(req),
    })

    const responseText = await upstreamResponse.text()
    const contentType = upstreamResponse.headers.get('content-type')

    if (contentType) {
      res.setHeader('content-type', contentType)
    }

    res.status(upstreamResponse.status).send(responseText)
  } catch (error) {
    res.status(502).json({
      message: 'Failed to reach HubSpot API',
      details: error?.message || 'Unknown upstream error',
    })
  }
}
