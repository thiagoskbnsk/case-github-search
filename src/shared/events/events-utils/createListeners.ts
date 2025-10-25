import type { EventListenerConfig } from '../events.types'
import type { CreateListenersInput } from './eventsUtils.types'

export const createListeners = <const T extends ReadonlyArray<EventListenerConfig>>(
  listeners: CreateListenersInput<T>
): EventListenerConfig[] => listeners as EventListenerConfig[]
