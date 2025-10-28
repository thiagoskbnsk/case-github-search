import { useEventStore } from '@shared/events/events-store'

import { BaseError } from './BaseError'

/**
 * Custom error for API request failures
 * Automatically extracts caller information and emits SEARCH_ERROR event
 */
export class ApiError extends BaseError {
  constructor(originalError: unknown, metadata?: Record<string, unknown>) {
    const errorMessage = originalError instanceof Error ? originalError.message : 'Unknown error'
    super(`API Error: ${errorMessage}`, originalError, metadata)

    const eventStore = useEventStore.getState()

    eventStore.emit('SEARCH_ERROR', {
      source: this.getContext(),
      metadata: this.metadata || {},
      error: errorMessage,
      statusCode: metadata?.statusCode as number | undefined,
    })
  }
}
