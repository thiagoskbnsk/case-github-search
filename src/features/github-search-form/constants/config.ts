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
