import { useEventStore } from './eventStore'
import { useEventListener } from './useEvents'

export const useSearchAnalyticsListener = () => {
  const analytics = useEventStore(state => state.analytics)

  useEventListener('SEARCH_COMPLETED', event => {
    const { query, resultCount, duration } = event.payload

    console.log(`Search "${query}" took ${duration}ms and returned ${resultCount} results`)

    // Access analytics through the store
    if (analytics) {
      analytics.track('search_performed', { query, resultCount, duration })
    }
  })

  useEventListener('REPOSITORY_SELECTED', event => {
    const { repositoryId, repositoryName, source } = event.payload

    console.log(`Repository selected: ${repositoryId} - ${repositoryName} from ${source}`)
  })
}

export const usePerformanceListener = () => {
  useEventListener('REPOSITORY_SELECTED', async event => {
    const { repositoryId } = event.payload

    // Prefetch related repositories
    try {
      // await recommendationService.prefetchRelated(repositoryId)
      console.log('Prefetching recommendations for repository:', repositoryId)
    } catch (error) {
      console.error('Failed to prefetch recommendations:', error)
    }
  })
}
