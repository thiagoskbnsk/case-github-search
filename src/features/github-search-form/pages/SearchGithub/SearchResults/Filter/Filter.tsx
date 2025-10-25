import { SORT_OPTIONS, type SortOptionValues } from '@features/github-search-form/constants/filters'
import { useSearchFilters } from '@features/github-search-form/contexts/github-search'
import { Select } from '@shared/components'

import { DEFAULT_TEXTS } from './Filter.placeholders'

export const Filter = () => {
  const { setSortFilter, setLanguageFilter, languageFilter, sortFilter, languageOptions } = useSearchFilters()

  return (
    <div className='flex w-full justify-between gap-4'>
      <Select<SortOptionValues>
        options={SORT_OPTIONS}
        onChange={option => setSortFilter(option)}
        value={sortFilter}
        placeholder={DEFAULT_TEXTS.sort.placeholder}
      />

      <Select
        options={languageOptions}
        onChange={option => setLanguageFilter(option)}
        value={languageFilter}
        placeholder={DEFAULT_TEXTS.filter.placeholder}
      />
    </div>
  )
}
