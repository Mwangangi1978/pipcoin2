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
  // In Vercel, req.url contains the original request path
  // e.g., "/api/hubspot/crm/v3/objects/contacts?limit=10"
  const targetPath = req.url.replace(/^\/api\/hubspot/, '');
  return `${HUBSPOT_BASE_URL}${targetPath}`;
}

const getBody = (req) => {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return undefined
  }

  // Vercel automatically parses JSON bodies into objects
  if (typeof req.body === 'object' && req.body !== null) {
    return JSON.stringify(req.body)
  }

  return req.body
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