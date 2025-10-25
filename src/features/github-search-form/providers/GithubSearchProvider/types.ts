import type { RepositoryUI } from '../../api/github/repositories'
import type { SortOptionValues } from '../../pages/SearchGithub/SearchResults/Filter/filters'
import type { Option } from '@shared/components'

export type SortFilter = Option<SortOptionValues>

export type GithubSearchState = {
  sortFilter: SortFilter
  languageFilter: Option
  repositories: RepositoryUI[]
  totalCount: number
  isLoading: boolean
  error: Error | null
  noResults: boolean
  languageOptions: Option[]
  setSortFilter: (sort: SortFilter) => void
  setLanguageFilter: (language: Option) => void
  handleSearch: (inputSearch: string) => void
  searchPromise: Promise<{ repositories: RepositoryUI[]; totalCount: number }>
  lastSearched: string
  getRepositoryById: (repositoryId: number) => RepositoryUI | null
}

export type Selector<T> = (state: GithubSearchState) => T
