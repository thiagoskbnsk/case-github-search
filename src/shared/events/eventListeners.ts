import type { EventStore } from './eventStore'
import type { AppEvent, EventTypeKeys } from './types'

/**
 * Type for event listener configuration with proper type inference
 */
type EventListenerConfig<T extends EventTypeKeys> = {
  type: T
  handler: (event: Extract<AppEvent, { type: T }>) => void | Promise<void>
}

/**
 * Analytics-related event listeners
 * Automatically registered when the store is created
 */
export const ANALYTICS_EVENT_LISTENERS = [
  {
    type: 'SEARCH_COMPLETED' as const,
    handler: (event: Extract<AppEvent, { type: 'SEARCH_COMPLETED' }>) => {
      const { query, resultCount, duration } = event.payload
      console.log(`Search "${query}" took ${duration}ms and returned ${resultCount} results`)
    },
  },
  {
    type: 'REPOSITORY_SELECTED' as const,
    handler: (event: Extract<AppEvent, { type: 'REPOSITORY_SELECTED' }>) => {
      const { repositoryId, repositoryName, source } = event.payload
      console.log(`Repository selected: ${repositoryId} - ${repositoryName} from ${source}`)
    },
  },
]

/**
 * Performance-related event listeners
 * Automatically registered when the store is created
 */
export const PERFORMANCE_EVENT_LISTENERS = [
  {
    type: 'REPOSITORY_SELECTED' as const,
    handler: async (event: Extract<AppEvent, { type: 'REPOSITORY_SELECTED' }>) => {
      const { repositoryId } = event.payload

      // Prefetch related repositories
      try {
        // await recommendationService.prefetchRelated(repositoryId)
        console.log('Prefetching recommendations for repository:', repositoryId)
      } catch (error) {
        console.error('Failed to prefetch recommendations:', error)
      }
    },
  },
]

/**
 * Logging-related event listeners
 * Automatically registered when the store is created
 */
export const LOGGING_EVENT_LISTENERS: Array<EventListenerConfig<EventTypeKeys>> = [
  // Add logging-specific listeners here if needed
]

/**
 * Registers all global event listeners to the store
 * Called automatically after store creation
 */
export const registerGlobalListeners = (store: EventStore) => {
  // Merge all listener arrays
  const allListeners = [...ANALYTICS_EVENT_LISTENERS, ...PERFORMANCE_EVENT_LISTENERS, ...LOGGING_EVENT_LISTENERS]

  // Register each listener
  allListeners.forEach(({ type, handler }) => {
    store.subscribe(type, handler as (event: AppEvent) => void)
  })
}
