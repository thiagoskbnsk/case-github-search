import { useCallback, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { useSearchInput } from '@/features/github-search-form/providers'

import { searchFormSchema } from './schemas'
import { SEARCH_FIELD_NAME } from './types'

import type { SearchFormData } from './types'

export const useSearchForm = () => {
  const { handleSearch, isLoading, lastSearched } = useSearchInput()

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<SearchFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(searchFormSchema),
    defaultValues: { [SEARCH_FIELD_NAME]: lastSearched },
  })

  const searchValue = useWatch({ name: SEARCH_FIELD_NAME, control })

  const onSubmit = useCallback((data: SearchFormData) => handleSearch(data[SEARCH_FIELD_NAME]), [handleSearch])

  const isSubmitDisabled = useMemo(
    () => isLoading || isSubmitting || !searchValue || !!errors[SEARCH_FIELD_NAME],
    [isLoading, isSubmitting, searchValue, errors]
  )

  const isFieldDisabled = useMemo(() => isLoading || isSubmitting, [isLoading, isSubmitting])

  return {
    register,
    handleSubmit,
    onSubmit,
    isSubmitDisabled,
    isFieldDisabled,
    isLoading,
    errors,
  }
}
