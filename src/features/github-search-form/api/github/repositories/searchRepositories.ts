import { githubService } from '../client'
import { mapSearchResponseToUI } from './mappers'
import { GitHubSearchResponseSchema } from './schemas'

import type { SearchResultsResponse, SearchResultsUI } from './types'

export const fetchSearchResults = async (searchTerm: string, page: number = 1): Promise<SearchResultsUI> => {
  const response = await githubService.searchRepositories<SearchResultsResponse>({ query: searchTerm, page })

  try {
    return mapSearchResponseToUI(GitHubSearchResponseSchema.parse(response.data))
  } catch (error) {
    console.error('API response validation failed:', error)

    throw new Error('Invalid API response format')
  }
}
