import type { TSelectOption, Option } from '@shared/components'
import type { SearchResultsResponse } from '@shared/services/github/endpoints/repositories.service'

import type { SortOptionValues } from '../../constants/sort-options'

export type SortFilter = TSelectOption<SortOptionValues>
export type GithubSearchContextType = {
  // State
  inputSearchValue: string
  sortFilter: SortFilter
  languageFilter: TSelectOption

  // Derived state
  repositories: SearchResultsResponse['items']
  totalCount: number
  isLoading: boolean
  error: Error | null
  noResults: boolean
  languageOptions: Option[]

  // Actions
  setInputSearchValue: (value: string) => void
  setSortFilter: (sort: SortFilter) => void
  setLanguageFilter: (language: TSelectOption) => void
  handleSearch: () => void
  clearSearch: () => void
}
