import { create } from 'zustand'

import { registerGlobalListeners } from './eventListeners'
import { analyticsMiddleware } from './middlewares/analyticsMiddleware'
import { devToolsMiddleware } from './middlewares/devToolsMiddleware'
import { eventLoggingMiddleware } from './middlewares/eventLoggingMiddleware'
import { middlewareComposer } from './middlewares/middlewareComposer'

import type { AppEvent, EventPayloadMap, EventTypeKeys } from './types'
import type { StateCreator } from 'zustand'

export interface AnalyticsTracker {
  track: (eventType: string, properties: Record<string, unknown>) => void
  page: (pageName: string) => void
}

export interface EventStore {
  events: AppEvent[]
  listeners: Map<string, Array<(event: AppEvent) => void>>
  featureFlags?: Record<string, boolean>
  analytics?: AnalyticsTracker

  emit: <T extends EventTypeKeys>(type: T, payload: EventPayloadMap[T], metadata?: Record<string, unknown>) => void
  subscribe: (eventType: string, callback: (event: AppEvent) => void) => () => void
  clearEvents: () => void
  getEventsByType: (eventType: string) => AppEvent[]
}

const baseStoreImplementation: StateCreator<EventStore, [], [], EventStore> = (set, get) => ({
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

  clearEvents: () => set({ events: [] }),

  getEventsByType: (eventType: string) => {
    return get().events.filter((event: AppEvent) => event.type === eventType)
  },
})

const isDevelopment = import.meta.env.DEV

export const createEventStore = (baseStore: StateCreator<EventStore, [], [], EventStore>) => {
  const composedStore = middlewareComposer<EventStore>(baseStore)(
    devToolsMiddleware({
      enabled: import.meta.env.VITE_DEVTOOLS_MIDDLEWARE_ENABLED === 'true',
      debugMode: isDevelopment,
      performanceTracking: true,
      devtoolsExtension: true,
    }),
    eventLoggingMiddleware({
      enabled: import.meta.env.VITE_EVENT_LOGGING_MIDDLEWARE_ENABLED === 'true',
    }),
    analyticsMiddleware({
      enabled: import.meta.env.VITE_ANALYTICS_MIDDLEWARE_ENABLED,
      apiKey: import.meta.env.VITE_NEXT_PUBLIC_ANALYTICS_KEY,
    })
  )

  const store = create(composedStore)

  // Auto-register global event listeners after store creation
  registerGlobalListeners(store.getState())

  return store
}

export const useEventStore = createEventStore(baseStoreImplementation)
