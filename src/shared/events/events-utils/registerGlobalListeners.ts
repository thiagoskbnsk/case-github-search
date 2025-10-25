import type { EventStore } from '../events-store'
import type { AppEvent } from '../events.types'
import type { EventListeners } from './eventsUtils.types'

export const registerGlobalListeners = (store: EventStore, listeners: Array<EventListeners>) => {
  const allListeners = listeners.flat()

  allListeners.forEach(({ type, handler }) => {
    store.subscribe(type, handler as (event: AppEvent) => void)
  })
}
