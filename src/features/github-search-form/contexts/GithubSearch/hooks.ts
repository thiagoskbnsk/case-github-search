import {useContextSelector} from 'use-context-selector'

import {GithubSearchContext} from './context'

import type {Selector} from './types'

export const useGithubSearchContext = <T>(selector: Selector<T>) =>
  useContextSelector(GithubSearchContext, state => selector(state))

export const useSearchResults = () =>
  useGithubSearchContext(state => ({
    error: state.error,
    noResults: state.noResults,
    searchPromise: state.searchPromise,
    shouldShowResults: Boolean(state.lastSearched),
  }))

export const useSearchInput = () =>
  useGithubSearchContext(state => ({
    handleSearch: state.handleSearch,
    isLoading: state.isLoading,
    lastSearched: state.lastSearched,
  }))

export const useSearchFilters = () =>
  useGithubSearchContext(state => ({
    sortFilter: state.sortFilter,
    languageFilter: state.languageFilter,
    setSortFilter: state.setSortFilter,
    setLanguageFilter: state.setLanguageFilter,
    languageOptions: state.languageOptions,
  }))

export const useResultsList = () =>
  useGithubSearchContext(state => ({
    repositories: state.repositories,
    sortFilter: state.sortFilter,
    languageFilter: state.languageFilter,
  }))

export const useRepositoryDetails = () =>
  useGithubSearchContext(state => ({
    getRepositoryById: state.getRepositoryById,
  }))
