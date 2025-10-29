import { z } from 'zod'

export const repositoryParamsSchema = z.object({
  repositoryId: z
    .string()
    .min(1, 'Repository ID is required')
    .transform((val, ctx) => {
      const parsed = parseInt(val, 10)

      if (isNaN(parsed) || parsed <= 0) {
        ctx.addIssue({
          code: 'custom',
          message: 'Repository ID must be greater than 0',
        })

        return z.NEVER
      }

      return parsed
    })
    .refine(val => val > 0, 'Repository ID must be greater than 0'),
})
