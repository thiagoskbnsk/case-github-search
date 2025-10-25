import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'

import { TextField } from '@shared/components'
import { Button } from '@shared/components/ui'

import { useSearchForm } from './hooks'
import { DEFAULT_TEXTS } from './placeholders'
import { SEARCH_FIELD_NAME } from './types'

export const SearchForm = () => {
  const { register, handleSubmit, onSubmit, isSubmitDisabled, isFieldDisabled, isLoading, errors } = useSearchForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex items-start gap-3'>
        <TextField
          label={DEFAULT_TEXTS.label}
          leftIcon={<MagnifyingGlassIcon />}
          placeholder={DEFAULT_TEXTS.placeholder}
          loading={isLoading}
          error={errors[SEARCH_FIELD_NAME]?.message}
          disabled={isFieldDisabled}
          {...register(SEARCH_FIELD_NAME)}
        />

        <Button disabled={isSubmitDisabled} type='submit'>
          {DEFAULT_TEXTS.buttonContent}
        </Button>
      </div>
    </form>
  )
}
