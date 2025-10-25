import { HttpClient, type ApiResponse, type RequestConfig } from '@shared/services'

import { GITHUB_API_BASE_URL, GITHUB_API_CONFIG, GITHUB_ENDPOINTS } from './config'

/**
 * GitHub API Service
 * Extends HttpClient with GitHub-specific configuration
 */
export class GithubService extends HttpClient {
  constructor() {
    super(GITHUB_API_BASE_URL, GITHUB_API_CONFIG)
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
