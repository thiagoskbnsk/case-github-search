import { z } from 'zod'

import type { searchFormSchema } from './schemas'

export type SearchFormData = z.infer<typeof searchFormSchema>
