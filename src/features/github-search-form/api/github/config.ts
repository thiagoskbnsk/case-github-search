export const GITHUB_API_BASE_URL = 'https://api.github.com'

export const GITHUB_API_HEADERS = {
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': 'GitHub-Search-App',
} as const

export const GITHUB_API_CONFIG = {
  retries: 2,
  headers: GITHUB_API_HEADERS,
} as const

export const GITHUB_ENDPOINTS = {
  SEARCH_REPOSITORIES: '/search/repositories',
} as const

export const GITHUB_SEARCH_CONFIG = {
  api: {
    baseUrl: 'https://api.github.com',
    timeout: 10000,
    retryAttempts: 3,
    rateLimitBuffer: 100, // ms between requests
  },
  cache: {
    ttl: 5 * 60 * 1000, // 5 minutes
  },
} as const

export type GithubSearchConfig = typeof GITHUB_SEARCH_CONFIG
