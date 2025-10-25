import { useContextSelector } from 'use-context-selector'

import { GithubSearchContext } from './context'

import type { Selector } from './types'

export const useGithubSearch = <T>(selector: Selector<T>) =>
  useContextSelector(GithubSearchContext, state => selector(state))

export const useSearchResults = () =>
  useGithubSearch(state => ({
    error: state.error,
    noResults: state.noResults,
    searchPromise: state.searchPromise,
    shouldShowResults: Boolean(state.lastSearched),
  }))

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
