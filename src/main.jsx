import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react' 
import './index.css'
import App from './App.jsx'

// Sentry initialize karo — App render se pehle
// DSN available hone pe hi initialize hoga
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,

    integrations: [
      // React Router ke saath page navigation track karo
      Sentry.browserTracingIntegration(),
      // JS errors capture karo
      Sentry.replayIntegration({
        // Koi bhi user input mask karo (passwords etc)
        maskAllInputs: true,
        maskAllText: false,
      }),
    ],

    // Performance tracking
    tracesSampleRate: import.meta.env.VITE_ENV === 'production' ? 0.1 : 1.0,
    // Session replay — error pe record karo kya hua
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,  // Error aane pe 100% replay capture

    environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || 'development',
  })
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
