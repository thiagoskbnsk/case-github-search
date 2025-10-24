import type { EventStore, AnalyticsTracker } from '../eventStore'
import type { EventTypeKeys, EventPayloadMap } from '../types'
import type { StateCreator } from 'zustand'

export interface AnalyticsOptions {
  enabled?: boolean
  apiKey?: string
}

/**
 * Analytics middleware - adds analytics tracking to events
 * Follows Zustand's standard middleware pattern
 */
export const analyticsMiddleware = (options: AnalyticsOptions = {}) => {
  const { enabled = true, apiKey } = options

  // Return a middleware creator function (Zustand pattern)
  return <T extends EventStore>(config: StateCreator<T, [], [], T>): StateCreator<T, [], [], T> => {
    // If disabled, return the config unchanged
    if (!enabled) return config

    // Return the wrapper function
    return (set, get, api) => {
      // Create the base store from the previous middleware/config
      const store = config(set, get, api)

      // Create analytics tracker
      const analytics: AnalyticsTracker = {
        track: (eventType: string, properties: Record<string, unknown>) => {
          if (typeof window !== 'undefined' && 'gtag' in window) {
            const gtag = (
              window as typeof window & {
                gtag: (command: string, targetId: string, parameters?: Record<string, unknown>) => void
              }
            ).gtag
            gtag('event', eventType.toLowerCase(), {
              event_category: 'user_interaction',
              event_label: JSON.stringify(properties),
              ...properties,
            })
          }

          // Custom analytics API
          if (apiKey) {
            fetch('/api/analytics/track', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                event: eventType,
                properties,
                timestamp: Date.now(),
                apiKey,
              }),
            }).catch(console.error)
          }
        },

        page: (pageName: string) => {
          analytics.track('page_view', { page: pageName })
        },
      }

      // Store the original emit before wrapping
      const originalEmit = store.emit

      // Wrap the emit function with analytics functionality
      store.emit = <K extends EventTypeKeys>(
        type: K,
        payload: EventPayloadMap[K],
        metadata: Record<string, unknown> = {}
      ) => {
        analytics.track(String(type), payload as Record<string, unknown>)

        // Call the original emit (from previous middleware in the chain)
        return originalEmit(type, payload, {
          ...metadata,
          trackedAt: Date.now(),
        })
      }

      // Add analytics to the store
      store.analytics = analytics

      return store
    }
  }
}
