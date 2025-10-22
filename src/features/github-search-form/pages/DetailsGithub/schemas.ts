import { z } from 'zod'

export const repositoryParamsSchema = z.object({
  repositoryId: z
    .string()
    .min(1, 'Repository ID is required')
    .transform(val => {
      const parsed = parseInt(val, 10)
      if (isNaN(parsed) || parsed <= 0) {
        throw new Error('Repository ID must be a valid positive number')
      }
      return parsed
    })
    .refine(val => val > 0, 'Repository ID must be greater than 0'),
})
