import type { Page } from '@playwright/test'

// Valid search terms for testing
export const VALID_SEARCH_TERMS = ['react', 'vue', 'angular', 'svelte', 'typescript', 'javascript']

// Invalid search terms for validation testing
export const INVALID_SEARCH_TERMS = {
  tooShort: ['a', 'ab'],
  onlyWhitespace: ['   ', '\t\t', '  \n  '],
  tooLong: 'a'.repeat(101),
  xss: ['<script>alert("XSS")</script>', '<img src=x onerror=alert(1)>'],
}

// Edge case searches
export const EDGE_CASE_SEARCHES = {
  specialChars: 'react-native',
  numbers: '2023',
  mixed: 'vue3-composition-api',
  withSpaces: '  react hooks  ',
}

// UI selectors and labels
export const SELECTORS: Record<string, { role: Parameters<Page['getByRole']>[0]; name?: string | RegExp }> = {
  searchInput: { role: 'textbox', name: /Search GitHub repositories/i },
  searchButton: { role: 'button', name: /^Search$/i },
  repositoryCard: { role: 'article' },
  heading: { role: 'heading', name: /Search All GitHub Repositories/i },
  detailsHeading: { role: 'heading', name: /Repository Details/i },
  backLink: { role: 'link', name: /go back/i },
}

// Expected texts
export const EXPECTED_TEXTS = {
  pageTitle: /Github Search/i,
  description: /Write a keyword and find the best repositories on GitHub/i,
  detailsDescription: /Detailed information about the selected GitHub repository/i,
  inputPlaceholder: 'Type to search...',
  ownerLabel: /Owner/i,
  repositoryLabel: /Repository/i,
  starsLabel: /Stars/i,
  forksLabel: /Forks/i,
  noMoreResults: /No more results/i,
  pageNotFound: /Page not found/i,
  goBackHome: /Go back home/i,
}

// Error messages
export const ERROR_MESSAGES = {
  minLength: /Minimum length is 3 characters/i,
  maxLength: /Maximum length is 100 characters/i,
  onlyWhitespace: /Search cannot be only whitespace/i,
  invalidCharacters: /Invalid characters detected/i,
}

// Repository IDs for testing
export const REPOSITORY_IDS = {
  valid: '123456',
  invalid: ['invalid-id', '999999999'],
}

// Routes
export const ROUTES = {
  home: '/',
  repository: (id: string) => `/repository/${id}`,
  notFound: '/some-nonexistent-route',
}

// Timeouts
export const TIMEOUTS = {
  cardLoad: 10000,
  scrollWait: 1000,
}

// Pagination settings
export const PAGINATION = {
  maxPages: 3,
  scrollIterations: 2,
}

// GitHub API constants (duplicated for E2E to avoid importing from src)
export const GITHUB_API = {
  baseUrl: 'https://api.github.com',
} as const

export const GITHUB_ENDPOINTS = {
  SEARCH_REPOSITORIES: '/search/repositories',
} as const
