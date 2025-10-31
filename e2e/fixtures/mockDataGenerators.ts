import { faker } from '@faker-js/faker'

import type { z } from 'zod'
import type {
  GitHubRepositorySchema,
  GitHubSearchResponseSchema,
} from '../../src/features/github-search-form/api/github/repositories/schemas'

export type GitHubRepository = z.infer<typeof GitHubRepositorySchema>
export type GitHubSearchResponse = z.infer<typeof GitHubSearchResponseSchema>

/**
 * Generate a single GitHub repository with realistic fake data
 */
export function generateRepository(overrides?: Partial<GitHubRepository>): GitHubRepository {
  return {
    id: faker.number.int({ min: 1000, max: 999999 }),
    name: faker.word
      .words({ count: { min: 1, max: 3 } })
      .replace(/\s+/g, '-')
      .toLowerCase(),
    description: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.8 }) ?? null,
    html_url: faker.internet.url(),
    language:
      faker.helpers.maybe(
        () =>
          faker.helpers.arrayElement([
            'JavaScript',
            'TypeScript',
            'Python',
            'Java',
            'Go',
            'Rust',
            'C++',
            'Ruby',
            'PHP',
            'Swift',
            'Kotlin',
            'C#',
          ]),
        { probability: 0.9 }
      ) ?? null,
    stargazers_count: faker.number.int({ min: 0, max: 50000 }),
    owner: {
      login: faker.internet.username(),
      avatar_url: faker.image.avatar(),
    },
    forks_count: faker.number.int({ min: 0, max: 10000 }),
    open_issues_count: faker.number.int({ min: 0, max: 500 }),
    ...overrides,
  }
}

/**
 * Generate multiple GitHub repositories
 */
export function generateRepositories(count: number, overrides?: Partial<GitHubRepository>): GitHubRepository[] {
  return Array.from({ length: count }, () => generateRepository(overrides))
}

/**
 * Generate a complete GitHub search response
 */
export function generateSearchResponse(options?: {
  itemCount?: number
  totalCount?: number
  incompleteResults?: boolean
  repositories?: Partial<GitHubRepository>[]
}): GitHubSearchResponse {
  const itemCount = options?.itemCount ?? 30
  const repositories = options?.repositories
    ? options.repositories.map(repo => generateRepository(repo))
    : generateRepositories(itemCount)

  return {
    total_count: options?.totalCount ?? repositories.length,
    incomplete_results: options?.incompleteResults ?? false,
    items: repositories,
  }
}

/**
 * Generate a paginated search response (for infinite scroll testing)
 */
export function generatePaginatedResponse(page: number, perPage = 30): GitHubSearchResponse {
  const totalCount = 150 // Total results across all pages
  const startIndex = (page - 1) * perPage
  const itemCount = Math.min(perPage, totalCount - startIndex)

  return generateSearchResponse({
    itemCount,
    totalCount,
    incompleteResults: false,
  })
}

/**
 * Generate an empty search response (no results found)
 */
export function generateEmptyResponse(): GitHubSearchResponse {
  return {
    total_count: 0,
    incomplete_results: false,
    items: [],
  }
}
