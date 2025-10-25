/**
 * GitHub API Configuration Constants
 */

export const GITHUB_API_BASE_URL = 'https://api.github.com'

export const GITHUB_API_HEADERS = {
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': 'GitHub-Search-App',
} as const

export const GITHUB_API_CONFIG = {
  retries: 2,
  headers: GITHUB_API_HEADERS,
} as const

/**
 * GitHub API Endpoints
 */
export const GITHUB_ENDPOINTS = {
  SEARCH_REPOSITORIES: '/search/repositories',
} as const
