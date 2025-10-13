import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import type { TSelectOption } from '@shared/components'
import { fetchSearchResults } from '@shared/services/github/endpoints/repositories.service'

import { GithubSearchContext } from './context'
import {
  DEFAULT_LANGUAGE_FILTER,
  selectLanguageOptions,
  selectHasNoResults,
  selectFilteredRepositories,
  selectTotalCount,
  selectRepositories,
} from './selectors'
import type { SortFilter } from './types'
import { GITHUB_SEARCH_CONFIG } from '../../constants/config'
import { SORT_OPTIONS } from '../../constants/sort-options'

export const GithubSearchProvider = ({ children }: React.PropsWithChildren) => {
  const [inputSearchValue, setInputSearchValue] = useState('')
  const [lastSearched, setLastSearched] = useState('')
  const [sortFilter, setSortFilter] = useState<SortFilter>(SORT_OPTIONS[0])
  const [languageFilter, setLanguageFilter] = useState<TSelectOption>(
    DEFAULT_LANGUAGE_FILTER
  )

  const { data, isLoading, error } = useQuery({
    queryKey: ['github-search', lastSearched],
    queryFn: () => fetchSearchResults(lastSearched),
    staleTime: GITHUB_SEARCH_CONFIG.cache.ttl,
    enabled: Boolean(lastSearched),
  })

  const repositories = useMemo(() => selectRepositories(data), [data])
  const totalCount = useMemo(() => selectTotalCount(data), [data])
  const noResults = useMemo(
    () => selectHasNoResults(lastSearched, data?.count),
    [lastSearched, data?.count]
  )
  const languageOptions = useMemo(
    () => selectLanguageOptions(repositories),
    [repositories]
  )
  const filteredRepositories = useMemo(
    () => selectFilteredRepositories(repositories, languageFilter, sortFilter),
    [repositories, languageFilter, sortFilter]
  )

  const clearSearch = useCallback(() => {
    setInputSearchValue('')
    setLastSearched('')
  }, [])

  const clearFilters = useCallback(() => {
    setSortFilter(SORT_OPTIONS[0])
    setLanguageFilter(DEFAULT_LANGUAGE_FILTER)
  }, [])

  const handleSearch = useCallback(() => {
    if (inputSearchValue !== lastSearched && inputSearchValue.trim()) {
      clearFilters()
      setLastSearched(inputSearchValue.trim())
    }
  }, [inputSearchValue, lastSearched, clearFilters])

  const value = useMemo(
    () => ({
      // State
      inputSearchValue,
      sortFilter,
      languageFilter,

      // Derived state
      repositories: filteredRepositories,
      totalCount,
      isLoading,
      error,
      noResults,
      languageOptions,

      // Actions
      setInputSearchValue,
      setSortFilter,
      setLanguageFilter,
      handleSearch,
      clearSearch,
    }),
    [
      inputSearchValue,
      sortFilter,
      languageFilter,
      filteredRepositories,
      totalCount,
      isLoading,
      error,
      noResults,
      languageOptions,
      setInputSearchValue,
      setSortFilter,
      setLanguageFilter,
      handleSearch,
      clearSearch,
    ]
  )

  return (
    <GithubSearchContext.Provider value={value}>
      {children}
    </GithubSearchContext.Provider>
  )
}
