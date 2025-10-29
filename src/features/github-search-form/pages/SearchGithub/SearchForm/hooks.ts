import { useCallback, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { useSearchInput } from '@features/github-search-form/providers'

import { searchFormSchema } from './schemas'
import { SEARCH_FIELD_NAME } from './types'

import type { SearchFormData } from './types'

export const useSearchForm = () => {
  const { handleSearch, isLoading, lastSearched } = useSearchInput()

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<SearchFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(searchFormSchema),
    defaultValues: { [SEARCH_FIELD_NAME]: lastSearched },
  })
  const searchValue = useWatch({ control, name: SEARCH_FIELD_NAME })

  const onSubmit = useCallback(
    (data: SearchFormData) => {
      const inputValue = data[SEARCH_FIELD_NAME]
      const trimmedValue = inputValue.trim()

      if (trimmedValue !== inputValue) {
        setValue(SEARCH_FIELD_NAME, trimmedValue)
      }

      return handleSearch(trimmedValue)
    },
    [handleSearch, setValue]
  )

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
