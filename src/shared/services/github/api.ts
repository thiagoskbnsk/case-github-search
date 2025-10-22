import { HttpClient } from '../client'

export const githubApiClient = new HttpClient('https://api.github.com', {
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'GitHub-Search-App',
  },
  retries: 2,
})
