import type { EventStore } from '../eventStore'
import type { EventTypeKeys, EventPayloadMap } from '../types'
import type { StateCreator } from 'zustand'

export interface LoggingOptions {
  enabled?: boolean
}

/**
 * Event logging middleware - adds performance marks and logging metadata
 * Follows Zustand's standard middleware pattern
 */
export const eventLoggingMiddleware = (options: LoggingOptions = {}) => {
  const { enabled = true } = options

  // Return a middleware creator function (Zustand pattern)
  return <T extends EventStore>(config: StateCreator<T, [], [], T>): StateCreator<T, [], [], T> => {
    // If disabled, return the config unchanged
    if (!enabled) return config

    // Return the wrapper function
    return (set, get, api) => {
      // Create the base store from the previous middleware/config
      const store = config(set, get, api)

      // Store the original emit before wrapping
      const originalEmit = store.emit

      // Wrap the emit function with logging functionality
      store.emit = <K extends EventTypeKeys>(
        type: K,
        payload: EventPayloadMap[K],
        metadata: Record<string, unknown> = {}
      ) => {
        performance.mark(`event-${type}-start`)

        // Call the original emit (from previous middleware in the chain)
        const result = originalEmit(type, payload, {
          ...metadata,
          loggedAt: Date.now(),
        })

        return result
      }

      return store
    }
  }
}
