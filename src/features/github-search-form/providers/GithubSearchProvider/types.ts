import type { RepositoryUI, SearchResultsUI } from '../../api/github/repositories'
import type { SortOptionValues } from '../../pages/SearchGithub/SearchResults/Filter/filters'
import type { Option } from '@shared/components'
import type { InfiniteData } from '@tanstack/react-query'

export type SortFilter = Option<SortOptionValues>

export type GithubSearchState = {
  sortFilter: SortFilter
  languageFilter: Option
  repositories: RepositoryUI[]
  isLoading: boolean
  error: Error | null
  languageOptions: Option[]
  noResults: boolean
  setSortFilter: (sort: SortFilter) => void
  setLanguageFilter: (language: Option) => void
  handleSearch: (inputSearch: string) => void
  lastSearched: string
  getRepositoryById: (repositoryId: number) => RepositoryUI | null
  handleFetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
  currentPage: number
  maxPages: number
  fetchSearchResultsPromise: Promise<InfiniteData<SearchResultsUI, unknown>>
}

export type Selector<T> = (state: GithubSearchState) => T
