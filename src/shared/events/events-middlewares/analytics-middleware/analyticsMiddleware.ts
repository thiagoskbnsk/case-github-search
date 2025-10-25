import { createMiddleware } from '../../events-utils'

import type { AnalyticsOptions, AnalyticsTracker } from './analyticsMiddleware.types'
import type { EventTypeKeys, EventPayloadMap } from '../../events.types'

export const analyticsMiddleware = createMiddleware<AnalyticsOptions>((options, store) => {
  const { apiKey } = options

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

  const originalEmit = store.emit

  store.emit = <K extends EventTypeKeys>(
    type: K,
    payload: EventPayloadMap[K],
    metadata: Record<string, unknown> = {}
  ) => {
    analytics.track(String(type), payload as Record<string, unknown>)

    return originalEmit(type, payload, {
      ...metadata,
      trackedAt: Date.now(),
    })
  }

  store.analytics = analytics

  return store
})
