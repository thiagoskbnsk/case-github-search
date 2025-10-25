import { createListeners } from '../../events-utils'

export const ANALYTICS_EVENT_LISTENERS = createListeners([
  {
    type: 'SEARCH_COMPLETED',
    handler: event => {
      const { query, resultCount, duration } = event.payload
      console.log(`Search "${query}" took ${duration}ms and returned ${resultCount} results`)
    },
  },
  {
    type: 'REPOSITORY_SELECTED',
    handler: event => {
      const { repositoryId, repositoryName, source } = event.payload
      console.log(`Repository selected: ${repositoryId} - ${repositoryName} from ${source}`)
    },
  },
])
