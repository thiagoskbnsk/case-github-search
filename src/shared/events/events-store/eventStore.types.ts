import type { AnalyticsTracker } from '../events-middlewares'
import type { AppEvent, EventPayloadMap, EventTypeKeys } from '../events.types'

export interface EventStore {
  events: AppEvent[]
  listeners: Map<string, Array<(event: AppEvent) => void>>
  featureFlags?: Record<string, boolean>
  analytics?: AnalyticsTracker

  emit: <T extends EventTypeKeys>(type: T, payload: EventPayloadMap[T], metadata?: Record<string, unknown>) => void
  subscribe: (eventType: string, callback: (event: AppEvent) => void) => () => void
}
