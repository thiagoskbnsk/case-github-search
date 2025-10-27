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
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SearchFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(searchFormSchema),
    defaultValues: { [SEARCH_FIELD_NAME]: lastSearched },
  })
  const searchValue = useWatch({ control, name: SEARCH_FIELD_NAME })

  const onSubmit = useCallback((data: SearchFormData) => handleSearch(data[SEARCH_FIELD_NAME]), [handleSearch])

  const handleClear = useCallback(() => {
    reset()
    handleSearch('')
  }, [reset, handleSearch])

  const isSubmitDisabled = useMemo(
    () => isSubmitting || isLoading || !!errors[SEARCH_FIELD_NAME] || !searchValue,
    [isSubmitting, isLoading, errors, searchValue]
  )

  const isFieldDisabled = useMemo(() => isSubmitting || isLoading, [isSubmitting, isLoading])

  return {
    control,
    handleSubmit,
    onSubmit,
    handleClear,
    isSubmitDisabled,
    isFieldDisabled,
    isLoading,
    errors,
  }
}
