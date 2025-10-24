import type { EventStore } from '../eventStore'
import type { EventTypeKeys, EventPayloadMap } from '../types'
import type { StateCreator } from 'zustand'

interface DevToolsOptions {
  enabled?: boolean
  debugMode?: boolean
  performanceTracking?: boolean
  devtoolsExtension?: boolean
}

interface ReduxDevtoolsExtension {
  send: (action: { type: string; payload: unknown; metadata?: Record<string, unknown> }, state: unknown) => void
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: ReduxDevtoolsExtension
  }
}

/**
 * DevTools middleware - adds debugging, performance tracking, and Redux DevTools integration
 * Follows Zustand's standard middleware pattern
 */
export const devToolsMiddleware = (options: DevToolsOptions = {}) => {
  const { enabled = true, debugMode = false, performanceTracking = false, devtoolsExtension = true } = options

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

      // Wrap the emit function with DevTools functionality
      store.emit = <K extends EventTypeKeys>(
        type: K,
        payload: EventPayloadMap[K],
        metadata: Record<string, unknown> = {}
      ) => {
        if (debugMode) {
          console.group(`🚀 DevTools Event: ${type}`)
          console.log('Payload:', payload)
          console.log('Timestamp:', new Date().toISOString())
          console.log('Metadata:', metadata)
          console.groupEnd()
        }

        if (performanceTracking) {
          performance.mark(`event-${type}-start`)
        }

        const enhancedMetadata: Record<string, unknown> = {
          ...metadata,
          devtools: true,
          timestamp: Date.now(),
          debugMode,
        }

        // Call the original emit (from previous middleware in the chain)
        const result = originalEmit(type, payload, enhancedMetadata)

        if (performanceTracking) {
          performance.mark(`event-${type}-end`)

          try {
            performance.measure(`event-${type}`, `event-${type}-start`, `event-${type}-end`)
            const measures = performance.getEntriesByName(`event-${type}`)
            const measure = measures[measures.length - 1]

            if (debugMode && measure && 'duration' in measure) {
              console.log(`⚡ Event ${type} took ${(measure as PerformanceMeasure).duration.toFixed(2)}ms`)
            }
          } catch (error) {
            if (debugMode) {
              console.warn(`Performance measurement failed for event ${type}:`, error)
            }
          }
        }

        if (devtoolsExtension && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
          try {
            window.__REDUX_DEVTOOLS_EXTENSION__.send(
              {
                type: `EVENT_${type}`,
                payload,
                metadata: enhancedMetadata,
              },
              get()
            )
          } catch (error) {
            if (debugMode) {
              console.warn(`DevTools extension error for event ${type}:`, error)
            }
          }
        }

        return result
      }

      return store
    }
  }
}
