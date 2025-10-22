import { githubApiClient } from '../api'
import { mapSearchResponseToUI } from './mappers'
import { GitHubSearchResponseSchema } from './schemas'

import type { SearchResultsResponse, SearchResultsUI } from './types'

export const fetchSearchResults = async (searchTerm: string): Promise<SearchResultsUI> => {
  const SEARCH_ENDPOINT = '/search/repositories'
  const url = `${SEARCH_ENDPOINT}?q=${encodeURIComponent(searchTerm)}`

  const response = await githubApiClient.get<SearchResultsResponse>(url)

  try {
    return mapSearchResponseToUI(GitHubSearchResponseSchema.parse(response.data))
  } catch (error) {
    console.error('API response validation failed:', error)

    throw new Error('Invalid API response format')
  }
}
