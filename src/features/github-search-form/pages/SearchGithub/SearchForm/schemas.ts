import { z } from 'zod'

export const searchFormSchema = z.object({
  search: z
    .string()
    .min(1, 'This field is required')
    .min(3, 'Minimum length is 3 characters')
    .max(100, 'Maximum length is 100 characters')
    .trim()
    .refine(value => !/^\s*$/.test(value), 'Search cannot be only whitespace')
    .refine(
      value => !value.includes('<script>'),
      'Invalid characters detected'
    ),
})
