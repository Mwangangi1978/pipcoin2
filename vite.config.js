import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const hubspotToken = env.HUBSPOT_SERVICE_KEY || env.VITE_HUBSPOT_SERVICE_KEY || ''

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/hubspot': {
          target: 'https://api.hubapi.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/hubspot/, ''),
          headers: hubspotToken
            ? {
                Authorization: `Bearer ${hubspotToken}`,
              }
            : undefined,
        },
      },
    },
  }
})
