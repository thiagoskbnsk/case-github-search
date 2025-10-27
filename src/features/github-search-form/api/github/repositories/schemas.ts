import { z } from 'zod'

export const GitHubRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  owner: z.object({
    login: z.string(),
    avatar_url: z.string().url(),
  }),
  forks_count: z.number(),
  open_issues_count: z.number(),
})

export const GitHubSearchResponseSchema = z.object({
  total_count: z.number().optional().default(0),
  incomplete_results: z.boolean().optional().default(false),
  items: z.array(GitHubRepositorySchema),
})
