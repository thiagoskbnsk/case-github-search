import { useCallback, useMemo } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { TextField } from '@shared/components'
import { Button } from '@shared/components/ui'

import { DEFAULT_TEXTS } from './placeholders'
import { searchFormSchema } from './schemas'
import { useSearchInput } from '../../../contexts/GithubSearch'

import type { SearchFormData } from './types'

export const SearchForm = () => {
  const { handleSearch, isLoading, lastSearched } = useSearchInput()
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<SearchFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(searchFormSchema),
    defaultValues: { search: lastSearched },
  })

  const searchFieldValue = useWatch({ name: 'search', control })
  const onSubmit = useCallback((data: SearchFormData) => handleSearch(data.search), [handleSearch])

  const disableButton = useMemo(
    () => isLoading || isSubmitting || !searchFieldValue || !!errors.search,
    [isLoading, isSubmitting, searchFieldValue, errors.search]
  )

  const disableField = useMemo(() => isLoading || isSubmitting, [isLoading, isSubmitting])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-start gap-3'>
        <TextField
          label={DEFAULT_TEXTS.label}
          leftIcon={<MagnifyingGlassIcon />}
          placeholder={DEFAULT_TEXTS.placeholder}
          loading={isLoading}
          error={errors.search?.message}
          disabled={disableField}
          {...register('search')}
        />

        <Button disabled={disableButton} type='submit'>
          {DEFAULT_TEXTS.buttonContent}
        </Button>
      </div>
    </form>
  )
}
