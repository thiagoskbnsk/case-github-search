import { useContextSelector } from 'use-context-selector'

import { GithubSearchContext } from './context'

import type { Selector } from './types'

export const useGithubSearch = <T>(selector: Selector<T>) =>
  useContextSelector(GithubSearchContext, state => {
    if (!state) {
      throw new Error('useGithubSearch must be used within GithubSearchProvider')
    }

    return selector(state)
  })

export const useSearchResults = () =>
  useGithubSearch(state => {
    const hasSearched = Boolean(state.lastSearched)

    return {
      error: state.error,
      noResults: state.noResults,
      shouldShowResults: hasSearched,
      fetchSearchResultsPromise: state.fetchSearchResultsPromise,
    }
  })

export const useSearchInput = () =>
  useGithubSearch(state => ({
    handleSearch: state.handleSearch,
    isLoading: state.isLoading,
    lastSearched: state.lastSearched,
  }))

export const useSearchFilters = () =>
  useGithubSearch(state => ({
    sortFilter: state.sortFilter,
    languageFilter: state.languageFilter,
    setSortFilter: state.setSortFilter,
    setLanguageFilter: state.setLanguageFilter,
    languageOptions: state.languageOptions,
    isLoading: state.isLoading,
  }))

export const useResultsList = () =>
  useGithubSearch(state => ({
    repositories: state.repositories,
    sortFilter: state.sortFilter,
    languageFilter: state.languageFilter,
  }))

export const useRepositoryDetails = () =>
  useGithubSearch(state => ({
    getRepositoryById: state.getRepositoryById,
  }))

export const useGithubSearchPagination = () =>
  useGithubSearch(state => {
    const showEndMessage = !state.hasNextPage && state.currentPage >= state.maxPages

    return {
      handleFetchNextPage: state.handleFetchNextPage,
      hasNextPage: state.hasNextPage,
      isFetchingNextPage: state.isFetchingNextPage,
      currentPage: state.currentPage,
      showEndMessage,
    }
  })
