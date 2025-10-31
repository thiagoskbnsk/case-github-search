/**
 * Environment utilities
 * Centralized access to environment variables for better readability and consistency
 */
export const isProd = import.meta.env.PROD
export const isDev = import.meta.env.DEV
export const isTestMode = import.meta.env.VITE_E2E_TEST_MODE === 'true'

/**
 * Event middleware configuration
 */
export const isEventLoggingMiddlewareEnabled = import.meta.env.VITE_EVENT_LOGGING_MIDDLEWARE_ENABLED === 'true'
export const isAnalyticsMiddlewareEnabled = import.meta.env.VITE_ANALYTICS_MIDDLEWARE_ENABLED === 'true'

/**
 * Analytics configuration
 */
export const analyticsApiKey = import.meta.env.VITE_NEXT_PUBLIC_ANALYTICS_KEY
