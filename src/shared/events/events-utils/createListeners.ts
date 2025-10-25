import type { CreateListenersInput, EventListenerConfig } from './eventsUtils.types'

export const createListeners = <const T extends ReadonlyArray<EventListenerConfig>>(
  listeners: CreateListenersInput<T>
): EventListenerConfig[] => listeners as EventListenerConfig[]
