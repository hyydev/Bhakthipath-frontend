import * as Sentry from '@sentry/react'
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom'

// Sentry ka built-in ErrorBoundary use karo
export const SentryErrorBoundary = Sentry.withErrorBoundary

// Route errors ke liye
export function RouteErrorBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()

  // Sentry pe manually capture karo
  if (error && !(error instanceof Response)) {
    Sentry.captureException(error)
  }

  // 404 vs actual error
  const is404 = isRouteErrorResponse(error) && error.status === 404

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">
          {is404 ? '404' : 'Oops!'}
        </h1>
        <p className="text-gray-600 mb-6">
          {is404
            ? 'Page not found.'
            : 'Something went wrong. Our team has been notified.'
          }
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg"
        >
          Go Home
        </button>
      </div>
    </div>
  )
}