import { z } from 'zod'

import type { GitHubRepositorySchema, GitHubSearchResponseSchema } from './schemas'

export type Repository = z.infer<typeof GitHubRepositorySchema>
export type SearchResultsResponse = z.infer<typeof GitHubSearchResponseSchema>

export interface SearchResultsUI {
  repositories: RepositoryUI[]
  incompleteResults: boolean
}

export interface RepositoryUI {
  id: number
  name: string
  description: string | null
  url: string
  language: string | null
  stars: number
  owner: {
    name: string
    avatar: string
  }
  forksCount: number
  openIssuesCount: number
  formattedForksCount: string
  formattedOpenIssuesCount: string
  displayLanguage: string
  displayDescription: string
  formattedLanguage: string
  formattedStars: string
  hasDescription: boolean
  hasLanguage: boolean
}
