import { ZodError } from 'zod'

import { ApiError, ApiValidationError } from '@shared/errors'

import { githubService } from '../client'
import { GITHUB_ENDPOINTS } from '../endpoints'
import { mapSearchResponseToUI } from './mappers'
import { GitHubSearchResponseSchema } from './schemas'

import type { SearchResultsResponse, SearchResultsUI } from './types'

/**
 * Fetches and validates GitHub repository search results
 * Combines HTTP request and validation in a single function
 */
export const fetchSearchResults = async (searchTerm: string, page: number = 1): Promise<SearchResultsUI> => {
  const params = new URLSearchParams({
    q: searchTerm,
    page: String(page),
  })

  const endpoint = `${GITHUB_ENDPOINTS.SEARCH_REPOSITORIES}?${params.toString()}`

  try {
    const response = await githubService.get<SearchResultsResponse>(endpoint)
    const validatedData = GitHubSearchResponseSchema.parse(response.data)

    return mapSearchResponseToUI(validatedData)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ApiValidationError(error, { searchTerm, page })
    }

    throw new ApiError(error, { searchTerm, page })
  }
}
