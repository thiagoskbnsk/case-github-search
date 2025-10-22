import type { SortOptionValues } from '../../constants/filters'
import type { Option } from '@shared/components'
import type { RepositoryUI } from '@shared/services/github/repositories/types'

export type SortFilter = Option<SortOptionValues>
export type GithubSearchContextType = {
  // State
  sortFilter: SortFilter
  languageFilter: Option
  // Derived state
  repositories: RepositoryUI[]
  totalCount: number
  isLoading: boolean
  error: Error | null
  noResults: boolean
  languageOptions: Option[]
  // Actions
  setSortFilter: (sort: SortFilter) => void
  setLanguageFilter: (language: Option) => void
  handleSearch: (inputSearch: string) => void

  searchPromise: Promise<{ repositories: RepositoryUI[]; totalCount: number }>
  lastSearched: string
  getRepositoryById: (repositoryId: number) => RepositoryUI | null
}

export type AdditionalSelectors = GithubSearchContextType
export type Selector<T> = (state: AdditionalSelectors) => T
