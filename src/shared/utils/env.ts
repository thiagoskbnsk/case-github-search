/**
 * Environment utilities
 * Centralized access to environment variables for better readability and consistency
 */
export const isProd = import.meta.env.PROD
export const isDev = import.meta.env.DEV

/**
 * Event middleware configuration
 */
export const isDevToolsMiddlewareEnabled = import.meta.env.VITE_DEVTOOLS_MIDDLEWARE_ENABLED === 'true'
export const isEventLoggingMiddlewareEnabled = import.meta.env.VITE_EVENT_LOGGING_MIDDLEWARE_ENABLED === 'true'
export const isAnalyticsMiddlewareEnabled = import.meta.env.VITE_ANALYTICS_MIDDLEWARE_ENABLED === 'true'

/**
 * Analytics configuration
 */
export const analyticsApiKey = import.meta.env.VITE_NEXT_PUBLIC_ANALYTICS_KEY
