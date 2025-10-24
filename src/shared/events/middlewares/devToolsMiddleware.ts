import type { EventStore } from '../eventStore'
import type { MiddlewareContext } from './middlewareComposer'
import type { EventTypeKeys, EventPayloadMap } from '../types'

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

export const devToolsMiddleware = (options: DevToolsOptions = {}) => {
  const { enabled = true, debugMode = false, performanceTracking = false, devtoolsExtension = true } = options

  return (context: MiddlewareContext<EventStore>) => {
    if (!enabled) return

    const { get, set } = context
    const originalEmit = get().emit

    const enhancedEmit = <T extends EventTypeKeys>(
      type: T,
      payload: EventPayloadMap[T],
      metadata: Record<string, unknown> = {}
    ) => {
      console.log('testsss')
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

      const result = originalEmit(type, payload, enhancedMetadata)

      if (performanceTracking) {
        performance.mark(`event-${type}-end`)

        try {
          performance.measure(`event-${type}`, `event-${type}-start`, `event-${type}-end`)
          const measures = performance.getEntriesByName(`event-${type}`)
          const measure = measures[measures.length - 1] // Get the latest measure

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

    set({ emit: enhancedEmit })
  }
}
