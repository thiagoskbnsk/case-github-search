import { githubService } from '../GithubService'
import { mapSearchResponseToUI } from './mappers'
import { GitHubSearchResponseSchema } from './schemas'

import type { SearchResultsResponse, SearchResultsUI } from './RepositoriesService.types'

export const fetchSearchResults = async (searchTerm: string): Promise<SearchResultsUI> => {
  const response = await githubService.searchRepositories<SearchResultsResponse>(searchTerm)

  try {
    return mapSearchResponseToUI(GitHubSearchResponseSchema.parse(response.data))
  } catch (error) {
    console.error('API response validation failed:', error)

    throw new Error('Invalid API response format')
  }
}
