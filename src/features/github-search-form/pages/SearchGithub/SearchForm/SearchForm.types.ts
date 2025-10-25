import { z } from 'zod'

import type { searchFormSchema } from './SearchForm.schemas'

export type SearchFormData = z.infer<typeof searchFormSchema>

export const SEARCH_FIELD_NAME = 'search' as const
