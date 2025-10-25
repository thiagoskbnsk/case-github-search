import { createMiddleware } from '../../events-utils'

import type { DevToolsOptions } from './devToolsMiddleware.types'
import type { EventTypeKeys, EventPayloadMap } from '@shared/events/events.types'

export const devToolsMiddleware = createMiddleware<DevToolsOptions>((options, store, _set, get) => {
  const { debugMode = false, performanceTracking = false, devtoolsExtension = true } = options

  const originalEmit = store.emit

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
})
