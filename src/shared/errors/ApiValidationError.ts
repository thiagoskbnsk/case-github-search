import { ZodError } from 'zod'

import { useEventStore } from '@shared/events/events-store'

import { BaseError } from './BaseError'

/**
 * Custom error for API validation failures
 * Automatically emits VALIDATION_ERROR events for each Zod issue
 */
export class ApiValidationError extends BaseError {
  zodError: ZodError

  constructor(zodError: ZodError, metadata?: Record<string, unknown>) {
    super('Invalid API response format', zodError, metadata)

    this.zodError = zodError

    const eventStore = useEventStore.getState()

    zodError.issues.forEach(issue => {
      eventStore.emit('VALIDATION_ERROR', {
        field: issue.path.join('.'),
        error: issue.message,
        value: issue,
        metadata: this.metadata || {},
      })
    })
  }
}
