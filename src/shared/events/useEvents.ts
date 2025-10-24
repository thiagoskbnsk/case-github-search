import { useCallback, useEffect } from 'react'

import { useEventStore } from './eventStore'

import type { AppEvent, EventPayloadMap, EventTypeKeys } from './types'

export const useEvents = () => {
  const { emit, subscribe, getEventsByType, clearEvents } = useEventStore()

  const emitEvent = useCallback(
    <T extends EventTypeKeys>(type: T, payload: EventPayloadMap[T], metadata?: Record<string, unknown>) => {
      emit(type, payload, metadata)
    },
    [emit]
  )

  return {
    emit: emitEvent,
    subscribe,
    getEventsByType,
    clearEvents,
  }
}

export const useEventListener = <T extends EventTypeKeys>(
  eventType: T,
  callbackFunction: (event: Extract<AppEvent, { type: T }>) => void
) => {
  useEffect(() => {
    const callback = callbackFunction as (event: AppEvent) => void
    const unsubscribe = useEventStore.getState().subscribe(eventType, callback)

    return unsubscribe
  }, [eventType, callbackFunction])
}
