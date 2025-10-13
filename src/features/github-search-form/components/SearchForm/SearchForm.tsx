import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'

import { TextField } from '@shared/components'
import { Button } from '@shared/components/ui'

import { DEFAULT_TEXTS } from './placeholders'
import { useSearchInput } from '../../contexts/GithubSearch'

export const SearchForm = () => {
  const { setInputSearchValue, inputSearchValue, handleSearch, isLoading } =
    useSearchInput()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('submit')

    handleSearch()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-3">
        <TextField
          label={DEFAULT_TEXTS.label}
          onChange={value => setInputSearchValue(value)}
          value={inputSearchValue}
          leftIcon={<MagnifyingGlassIcon />}
          placeholder={DEFAULT_TEXTS.placeholder}
          name="search"
          loading={isLoading}
        />

        <Button disabled={isLoading} type="submit">
          {DEFAULT_TEXTS.buttonContent}
        </Button>
      </div>
    </form>
  )
}
