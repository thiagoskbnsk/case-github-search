import { HttpClient, type ApiResponse, type RequestConfig } from '@shared/services'

import { GITHUB_API } from './config'
import { GITHUB_ENDPOINTS } from './endpoints'

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
  async searchRepositories<T>(query: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const endpoint = `${GITHUB_ENDPOINTS.SEARCH_REPOSITORIES}?q=${encodeURIComponent(query)}`
    return this.get<T>(endpoint, config)
  }
}

/**
 * Singleton instance of GithubService
 */
export const githubService = new GithubService()
