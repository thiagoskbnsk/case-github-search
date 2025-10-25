import { createMiddleware } from '../../events-utils'

import type { LoggingOptions } from './eventLoggingMiddleware.types'
import type { EventTypeKeys, EventPayloadMap } from '@shared/events/events.types'

export const eventLoggingMiddleware = createMiddleware<LoggingOptions>((_options, store) => {
  const originalEmit = store.emit

  store.emit = <K extends EventTypeKeys>(
    type: K,
    payload: EventPayloadMap[K],
    metadata: Record<string, unknown> = {}
  ) => {
    performance.mark(`event-${type}-start`)

    const result = originalEmit(type, payload, {
      ...metadata,
      loggedAt: Date.now(),
    })

    return result
  }

  return store
})
