import { createListeners } from '../../events-utils'

export const LOGGING_EVENT_LISTENERS = createListeners([
  {
    type: 'ERROR_BOUNDARY',
    name: 'Error Logging - Error Boundary',
    handler: event => {
      const { error, errorInfo } = event.payload
      console.error(`[Error Monitoring] Error Boundary caught: ${error}`, errorInfo)
    },
  },
  {
    type: 'SEARCH_ERROR',
    name: 'Error Logging - Search Error',
    handler: event => {
      const { source, metadata, error, statusCode } = event.payload
      console.error(`[Error Monitoring] ${source} - Search error:`, {
        error,
        statusCode: statusCode || 'N/A',
        metadata,
      })
    },
  },
  {
    type: 'VALIDATION_ERROR',
    name: 'Error Logging - Validation Error',
    handler: event => {
      const { field, error, value } = event.payload
      console.error(`[Error Monitoring] Validation error on field "${field}": ${error}`, value)
    },
  },
])
