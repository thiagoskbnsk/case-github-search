import { useCallback, useMemo, useState, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { useEvents } from '@shared/events'

import { GithubSearchContext } from './context'
import { getNextPageParam, selectLanguageOptions, handleFilterAndSort, findRepositoryById } from './helpers'
import { fetchSearchResults, GITHUB_CACHE } from '../../api/github'
import { DEFAULT_LANGUAGE_FILTER, SORT_OPTIONS } from '../../pages/SearchGithub/SearchResults/Filter/filters'
import { MAX_PAGES, DEFAULT_SEARCH_RESULTS_DATA } from './constants'

import type { SortFilter } from './types'
import type { Option } from '@shared/components'

export const GithubSearchProvider = ({ children }: React.PropsWithChildren) => {
  const { emit } = useEvents()
  const [lastSearched, setLastSearched] = useState('')
  const [sortFilter, setSortFilter] = useState<SortFilter>(SORT_OPTIONS[0])
  const [languageFilter, setLanguageFilter] = useState<Option>(DEFAULT_LANGUAGE_FILTER)

  const {
    data = DEFAULT_SEARCH_RESULTS_DATA,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['github-search', lastSearched],
    queryFn: ({ pageParam }) => fetchSearchResults(lastSearched, pageParam),
    initialPageParam: 1,
    getNextPageParam,
    maxPages: MAX_PAGES,
    staleTime: GITHUB_CACHE.ttl,
    gcTime: GITHUB_CACHE.ttl * 2,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(lastSearched),
  })

  const { pages } = data

  // Flatten all pages into a single array of repositories
  const allRepositories = useMemo(() => pages.flatMap(page => page.repositories), [pages])
  const currentPage = useMemo(() => pages.length, [pages])
  const languageOptions = useMemo(() => selectLanguageOptions(allRepositories), [allRepositories])

  const filteredRepositories = useMemo(() => {
    return handleFilterAndSort(allRepositories, {
      filteredBy: languageFilter.value,
      sortedBy: sortFilter.value,
    })
  }, [allRepositories, languageFilter, sortFilter])

  // Calculate no results state
  const noResults = useMemo(() => {
    const hasSearched = Boolean(lastSearched)
    return hasSearched && allRepositories.length === 0 && !error && !isLoading
  }, [lastSearched, allRepositories.length, error, isLoading])

  // Track search completion and no results
  useEffect(() => {
    if (noResults) {
      emit('SEARCH_NO_RESULTS', {
        query: lastSearched,
        timestamp: Date.now(),
      })
    }
  }, [noResults, lastSearched, emit])

  const clearFilters = useCallback(() => {
    setSortFilter(SORT_OPTIONS[0])
    setLanguageFilter(DEFAULT_LANGUAGE_FILTER)
  }, [])

  const handleSearch = useCallback(
    (inputSearchValue: string) => {
      const isDifferentSearch = inputSearchValue !== lastSearched

      if (isDifferentSearch) {
        if (inputSearchValue) {
          emit('SEARCH_SUBMIT', {
            query: inputSearchValue,
            timestamp: Date.now(),
          })
        }

        clearFilters()
        setLastSearched(inputSearchValue)
      }
    },
    [lastSearched, clearFilters, emit]
  )

  const getRepositoryById = useCallback(
    (repositoryId: number) => findRepositoryById(filteredRepositories, repositoryId),
    [filteredRepositories]
  )

  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      const nextPage = currentPage + 1

      emit('SEARCH_PAGINATION', {
        query: lastSearched,
        pageNumber: nextPage,
        trigger: 'scroll',
      })

      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, currentPage, lastSearched, emit, fetchNextPage])

  const value = useMemo(
    () => ({
      sortFilter,
      languageFilter,
      repositories: filteredRepositories,
      isLoading,
      error,
      languageOptions,
      noResults,
      setSortFilter,
      setLanguageFilter,
      handleSearch,
      lastSearched,
      getRepositoryById,
      handleFetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      currentPage,
      maxPages: MAX_PAGES,
    }),
    [
      sortFilter,
      languageFilter,
      filteredRepositories,
      isLoading,
      error,
      languageOptions,
      noResults,
      setSortFilter,
      setLanguageFilter,
      handleSearch,
      lastSearched,
      getRepositoryById,
      handleFetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      currentPage,
    ]
  )

  return <GithubSearchContext.Provider value={value}>{children}</GithubSearchContext.Provider>
}
