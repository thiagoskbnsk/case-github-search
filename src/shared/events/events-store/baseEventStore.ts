import type { EventStore } from './eventStore.types'
import type { AppEvent, EventPayloadMap, EventTypeKeys } from '../events.types'
import type { StateCreator } from 'zustand'

export const baseStoreImplementation: StateCreator<EventStore, [], [], EventStore> = (set, get) => ({
  events: [],
  listeners: new Map(),

  emit: <T extends EventTypeKeys>(type: T, payload: EventPayloadMap[T], metadata: Record<string, unknown> = {}) => {
    const event: AppEvent = {
      id: crypto.randomUUID(),
      type,
      payload,
      timestamp: Date.now(),
      metadata,
    } as AppEvent

    set((state: EventStore) => ({
      events: [...state.events.slice(-99), event],
    }))

    const listeners = get().listeners.get(type) || []
    listeners.forEach((callback: (event: AppEvent) => void) => {
      try {
        callback(event)
      } catch (error) {
        console.error(`Error in event listener for ${type}:`, error)
      }
    })
  },

  subscribe: (eventType: string, callback: (event: AppEvent) => void) => {
    set((state: EventStore) => {
      const currentListeners = state.listeners.get(eventType) || []
      const newListeners = new Map(state.listeners)
      newListeners.set(eventType, [...currentListeners, callback])
      return { listeners: newListeners }
    })

    return () => {
      set((state: EventStore) => {
        const currentListeners = state.listeners.get(eventType) || []
        const newListeners = new Map(state.listeners)
        newListeners.set(
          eventType,
          currentListeners.filter((cb: (event: AppEvent) => void) => cb !== callback)
        )
        return { listeners: newListeners }
      })
    }
  },
})
