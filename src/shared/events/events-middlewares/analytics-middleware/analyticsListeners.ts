import { createListeners } from '../../events-utils'

export const ANALYTICS_EVENT_LISTENERS = createListeners([
  {
    type: 'PAGE_VIEW',
    handler: event => {
      const { path, title } = event.payload
      console.log(`[Analytics] Page view: ${title} (${path})`)
    },
  },
  {
    type: 'CARD_CLICK',
    handler: event => {
      const { repositoryId, repository } = event.payload
      console.log(`[Analytics] Card clicked: ${repository.name} (ID: ${repositoryId})`)
    },
  },
  {
    type: 'SEARCH_SUBMIT',
    handler: event => {
      const { query, timestamp } = event.payload
      console.log(`[Analytics] Search submitted: "${query}" at ${new Date(timestamp).toISOString()}`)
    },
  },
  {
    type: 'SEARCH_PAGINATION',
    handler: event => {
      const { query, pageNumber, trigger } = event.payload
      console.log(`[Analytics] Search pagination: Page ${pageNumber} for "${query}" (trigger: ${trigger})`)
    },
  },
  {
    type: 'SEARCH_NO_RESULTS',
    handler: event => {
      const { query, timestamp } = event.payload
      console.log(`[Analytics] No results found for: "${query}" at ${new Date(timestamp).toISOString()}`)
    },
  },
])
