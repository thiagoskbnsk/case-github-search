import { HttpClient, type ApiResponse, type RequestConfig } from '@shared/services'

import { GITHUB_API } from './config'
import { GITHUB_ENDPOINTS } from './endpoints'

import type { SearchRepositoriesParams } from './types'

/**
 * GitHub API Service
 * Extends HttpClient with GitHub-specific configuration
 */
export class GithubService extends HttpClient {
  constructor() {
    super(GITHUB_API.baseUrl, {
      retries: GITHUB_API.retries,
      headers: GITHUB_API.headers,
    })
  }

  /**
   * Search repositories on GitHub
   */
  async searchRepositories<T>(
    { query, page = 1 }: SearchRepositoriesParams,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const params = new URLSearchParams({
      q: query,
      page: String(page),
    })
    const endpoint = `${GITHUB_ENDPOINTS.SEARCH_REPOSITORIES}?${params.toString()}`
    return this.get<T>(endpoint, config)
  }
}

/**
 * Singleton instance of GithubService
 */
export const githubService = new GithubService()
