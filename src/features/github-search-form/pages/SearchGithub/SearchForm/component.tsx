import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { Controller } from 'react-hook-form'

import { TextField } from '@shared/components'
import { Button } from '@shared/components/ui'

import { useSearchForm } from './hooks'
import { DEFAULT_TEXTS } from './placeholders'
import { SEARCH_FIELD_NAME } from './types'

export const SearchForm = () => {
  const { control, handleSubmit, onSubmit, handleClear, isSubmitDisabled, isFieldDisabled, isLoading, errors } =
    useSearchForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-start gap-3'>
        <Controller
          name={SEARCH_FIELD_NAME}
          control={control}
          render={({ field }) => (
            <TextField
              label={DEFAULT_TEXTS.label}
              leftIcon={<MagnifyingGlassIcon />}
              placeholder={DEFAULT_TEXTS.placeholder}
              loading={isLoading}
              error={errors[SEARCH_FIELD_NAME]?.message}
              disabled={isFieldDisabled}
              onClear={handleClear}
              value={field.value}
              onChange={field.onChange}
              name={field.name}
            />
          )}
        />

        <Button disabled={isSubmitDisabled} type='submit'>
          {DEFAULT_TEXTS.buttonContent}
        </Button>
      </div>
    </form>
  )
}
