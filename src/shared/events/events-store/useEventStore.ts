import { create, type StateCreator } from 'zustand'

import { analyticsApiKey, isAnalyticsMiddlewareEnabled, isEventLoggingMiddlewareEnabled } from '@shared/utils'

import {
  analyticsMiddleware,
  ANALYTICS_EVENT_LISTENERS,
  eventLoggingMiddleware,
  LOGGING_EVENT_LISTENERS,
} from '../events-middlewares'
import { composeMiddlewares, registerGlobalListeners } from '../events-utils'
import { baseStoreImplementation } from './baseEventStore'

import type { EventStore } from './eventStore.types'

const createEventStore = (baseStore: StateCreator<EventStore, [], [], EventStore>) => {
  const composedStore = composeMiddlewares<EventStore>(baseStore)(
    eventLoggingMiddleware({
      enabled: isEventLoggingMiddlewareEnabled,
    }),
    analyticsMiddleware({
      enabled: isAnalyticsMiddlewareEnabled,
      apiKey: analyticsApiKey,
    })
  )

  const store = create(composedStore)

  registerGlobalListeners(store.getState(), [ANALYTICS_EVENT_LISTENERS, LOGGING_EVENT_LISTENERS])

  return store
}

export const useEventStore = createEventStore(baseStoreImplementation)
