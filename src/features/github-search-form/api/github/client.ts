import { HttpClient } from '@shared/services'

import { GITHUB_API } from './config'

/**
 * GitHub API Service
 * Extends HttpClient with GitHub-specific configuration
 */
export class GithubService extends HttpClient {
  constructor() {
    super(GITHUB_API.baseUrl, {
      retries: GITHUB_API.retries,
      timeout: GITHUB_API.timeout,
      headers: GITHUB_API.headers,
    })
  }
}

/**
 * Singleton instance of GithubService
 */
export const githubService = new GithubService()
