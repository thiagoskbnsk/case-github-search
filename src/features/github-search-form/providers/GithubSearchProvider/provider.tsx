import { useCallback, useMemo, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { GithubSearchContext } from './context'
import { getNextPageParam, selectLanguageOptions, handleFilterAndSort, findRepositoryById } from './helpers'
import { fetchSearchResults, GITHUB_CACHE } from '../../api/github'
import { DEFAULT_LANGUAGE_FILTER, SORT_OPTIONS } from '../../pages/SearchGithub/SearchResults/Filter/filters'
import { MAX_PAGES, DEFAULT_SEARCH_RESULTS_DATA } from './constants'

import type { SortFilter } from './types'
import type { Option } from '@shared/components'

export const GithubSearchProvider = ({ children }: React.PropsWithChildren) => {
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

  const clearFilters = useCallback(() => {
    setSortFilter(SORT_OPTIONS[0])
    setLanguageFilter(DEFAULT_LANGUAGE_FILTER)
  }, [])

  const handleSearch = useCallback(
    (inputSearchValue: string) => {
      const isDifferentSearch = inputSearchValue !== lastSearched

      if (isDifferentSearch) {
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
      isLoading,
      error,
      languageOptions,
      setSortFilter,
      setLanguageFilter,
      handleSearch,
      lastSearched,
      getRepositoryById,
      fetchNextPage,
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
      setSortFilter,
      setLanguageFilter,
      handleSearch,
      lastSearched,
      getRepositoryById,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      currentPage,
    ]
  )

  return <GithubSearchContext.Provider value={value}>{children}</GithubSearchContext.Provider>
}
