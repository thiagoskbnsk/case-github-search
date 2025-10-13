import { useContextSelector } from 'use-context-selector'

import { GithubSearchContext } from './context'
import type { GithubSearchContextType } from './types'

type Selector<T> = (state: AdditionalSelectors) => T

interface AdditionalSelectors extends GithubSearchContextType {
  shouldShowResults: boolean
}

/** Main selector hook **/
export const useGithubSearchContext = <T>(selector: Selector<T>) => {
  return useContextSelector(GithubSearchContext, state =>
    selector({
      ...state,
      // Additional computed properties for UI
      shouldShowResults:
        !state.isLoading && !state.error && state.totalCount > 0,
    })
  )
}

export const useSearchResults = () =>
  useGithubSearchContext(state => ({
    isLoading: state.isLoading,
    error: state.error,
    noResults: state.noResults,
    shouldShowResults: state.shouldShowResults,
  }))

export const useSearchInput = () =>
  useGithubSearchContext(state => ({
    inputSearchValue: state.inputSearchValue,
    setInputSearchValue: state.setInputSearchValue,
    handleSearch: state.handleSearch,
    isLoading: state.isLoading,
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
