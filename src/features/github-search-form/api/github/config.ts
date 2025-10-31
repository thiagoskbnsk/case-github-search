export const GITHUB_API = {
  baseUrl: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'GitHub-Search-App',
  },
  retries: 2,
  timeout: 5000,
} as const

export const GITHUB_CACHE = {
  ttl: 5 * 60 * 1000, // 5 minutes
} as const
