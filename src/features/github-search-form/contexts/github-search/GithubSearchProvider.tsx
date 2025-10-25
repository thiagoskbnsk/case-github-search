import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { GithubSearchContext } from './context'
import { selectLanguageOptions, handleFilterAndSort, findRepositoryById } from './selectors'
import { GITHUB_SEARCH_CONFIG } from '../../constants/config'
import { DEFAULT_LANGUAGE_FILTER, SORT_OPTIONS } from '../../constants/filters'
import { DEFAULT_SEARCH_RESULTS_DATA } from '../../services/github/repositories/RepositoriesService.constants'
import { fetchSearchResults } from '../../services/github/repositories/RepositoriesService.service'

import type { SortFilter } from './GithubSearchContext.types'
import type { Option } from '@shared/components'

export const GithubSearchProvider = ({ children }: React.PropsWithChildren) => {
  const [lastSearched, setLastSearched] = useState('')
  const [sortFilter, setSortFilter] = useState<SortFilter>(SORT_OPTIONS[0])
  const [languageFilter, setLanguageFilter] = useState<Option>(DEFAULT_LANGUAGE_FILTER)

  const {
    data = DEFAULT_SEARCH_RESULTS_DATA,
    isLoading,
    error,
    promise: searchPromise,
  } = useQuery({
    queryKey: ['github-search', lastSearched],
    queryFn: () => fetchSearchResults(lastSearched),
    staleTime: GITHUB_SEARCH_CONFIG.cache.ttl,
    enabled: Boolean(lastSearched),
    experimental_prefetchInRender: true,
  })

  const { repositories, totalCount } = data

  const noResults = useMemo(
    () => Boolean(lastSearched) && totalCount === 0 && !error && !isLoading,
    [lastSearched, totalCount, error, isLoading]
  )

  const languageOptions = useMemo(() => selectLanguageOptions(repositories), [repositories])

  const filteredRepositories = useMemo(() => {
    return handleFilterAndSort(repositories, {
      filteredBy: languageFilter.value,
      sortedBy: sortFilter.value,
    })
  }, [repositories, languageFilter, sortFilter])

  const clearFilters = useCallback(() => {
    setSortFilter(SORT_OPTIONS[0])
    setLanguageFilter(DEFAULT_LANGUAGE_FILTER)
  }, [])

  const handleSearch = useCallback(
    (inputSearchValue: string) => {
      const shouldDoANewSearch = inputSearchValue && inputSearchValue !== lastSearched

      if (shouldDoANewSearch) {
        clearFilters()
        setLastSearched(inputSearchValue)
      }
    },
    [lastSearched, clearFilters]
  )

  const getRepositoryById = useCallback(
    (repositoryId: number) => findRepositoryById(filteredRepositories, repositoryId),
    [filteredRepositories]
  )

  const value = useMemo(
    () => ({
      sortFilter,
      languageFilter,
      repositories: filteredRepositories,
      totalCount,
      isLoading,
      error,
      noResults,
      languageOptions,
      setSortFilter,
      setLanguageFilter,
      handleSearch,
      searchPromise,
      lastSearched,
      getRepositoryById,
    }),
    [
      sortFilter,
      languageFilter,
      filteredRepositories,
      totalCount,
      isLoading,
      error,
      noResults,
      languageOptions,
      setSortFilter,
      setLanguageFilter,
      handleSearch,
      searchPromise,
      lastSearched,
      getRepositoryById,
    ]
  )

  return <GithubSearchContext.Provider value={value}>{children}</GithubSearchContext.Provider>
}
