import type { MiddlewareContext } from './middlewareComposer'
import type { EventStore, AnalyticsTracker } from '../eventStore'
import type { EventTypeKeys, EventPayloadMap } from '../types'

export interface AnalyticsOptions {
  enabled?: boolean
  apiKey?: string
}

export const analyticsMiddleware = (options: AnalyticsOptions = {}) => {
  const { enabled = true, apiKey } = options

  return (context: MiddlewareContext<EventStore>) => {
    if (!enabled) return

    const { get, set } = context

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

    const originalEmit = get().emit

    const enhancedEmit = <T extends Parameters<typeof originalEmit>[0]>(
      type: T,
      payload: Parameters<typeof originalEmit>[1],
      metadata: Record<string, unknown> = {}
    ) => {
      analytics.track(String(type), payload as Record<string, unknown>)

      return originalEmit(type as EventTypeKeys, payload as EventPayloadMap[EventTypeKeys], {
        ...metadata,
        trackedAt: Date.now(),
      })
    }

    set({
      emit: enhancedEmit,
      analytics,
    })
  }
}
