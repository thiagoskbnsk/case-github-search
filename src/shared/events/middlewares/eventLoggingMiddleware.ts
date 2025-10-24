import type { MiddlewareContext } from './middlewareComposer'
import type { EventStore } from '../eventStore'
import type { EventTypeKeys, EventPayloadMap } from '../types'

export interface LoggingOptions {
  enabled?: boolean
}

export const eventLoggingMiddleware = (options: LoggingOptions = {}) => {
  const { enabled = true } = options

  return (context: MiddlewareContext<EventStore>) => {
    if (!enabled) return

    const { get, set } = context
    // TODO: get() returns undefined for the first call
    const originalEmit = get().emit

    const enhancedEmit = <T extends Parameters<typeof originalEmit>[0]>(
      type: T,
      payload: Parameters<typeof originalEmit>[1],
      metadata: Record<string, unknown> = {}
    ) => {
      performance.mark(`event-${type}-start`)

      const result = originalEmit(type as EventTypeKeys, payload as EventPayloadMap[EventTypeKeys], {
        ...metadata,
        loggedAt: Date.now(),
      })

      return result
    }

    set({
      emit: enhancedEmit,
    })
  }
}
