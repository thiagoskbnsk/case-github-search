import { createListeners } from '../../events-listeners'

export const PERFORMANCE_EVENT_LISTENERS = createListeners([
  {
    type: 'REPOSITORY_SELECTED',
    handler: async event => {
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
])
