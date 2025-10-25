import { create, type StateCreator } from 'zustand'

import {
  ANALYTICS_EVENT_LISTENERS,
  analyticsMiddleware,
  devToolsMiddleware,
  eventLoggingMiddleware,
  PERFORMANCE_EVENT_LISTENERS,
} from '../events-middlewares'
import { baseStoreImplementation } from './baseEventStore'
import { composeMiddlewares, registerGlobalListeners } from '../events-utils'

import type { EventStore } from './eventStore.types'

const createEventStore = (baseStore: StateCreator<EventStore, [], [], EventStore>) => {
  const composedStore = composeMiddlewares<EventStore>(baseStore)(
    devToolsMiddleware({
      enabled: import.meta.env.VITE_DEVTOOLS_MIDDLEWARE_ENABLED === 'true',
      debugMode: import.meta.env.DEV,
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

  registerGlobalListeners(store.getState(), [ANALYTICS_EVENT_LISTENERS, PERFORMANCE_EVENT_LISTENERS])

  return store
}

export const useEventStore = createEventStore(baseStoreImplementation)
