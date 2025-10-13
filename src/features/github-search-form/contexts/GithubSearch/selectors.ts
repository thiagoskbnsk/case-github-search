import type { TSelectOption, Option } from '@shared/components'
import type { SearchResultsResponse } from '@shared/services/github/endpoints/repositories.service'

export const DEFAULT_LANGUAGE_FILTER: TSelectOption = {
  id: 'all',
  label: 'All',
  value: '',
}

/**
 * Selects unique language options from repositories
 */
export const selectLanguageOptions = (
  repositories: SearchResultsResponse['items']
): Option[] => {
  const uniqueLanguages = repositories
    .map(repo => repo.language)
    .filter((language): language is string => Boolean(language))

  const uniqueLanguagesSet = new Set(uniqueLanguages)

  const languagesList = [...uniqueLanguagesSet].map(language => ({
    id: language,
    label: language,
    value: language?.toLowerCase(),
  }))

  return [
    {
      id: 'all',
      label: 'All',
      value: '',
    },
    ...languagesList,
  ]
}

/**
 * Checks if there are no search results
 */
export const selectHasNoResults = (
  lastSearched: string,
  count?: number
): boolean => {
  return Boolean(lastSearched) && count === 0
}

/**
 * Selects repositories based on language and sort filters
 */
export const selectFilteredRepositories = (
  repositories: SearchResultsResponse['items'],
  languageFilter: TSelectOption,
  sortFilter: TSelectOption
): SearchResultsResponse['items'] => {
  let filteredRepositories = [...repositories]

  // Apply language filter
  if (languageFilter?.value && languageFilter.value !== '') {
    filteredRepositories = filteredRepositories.filter(
      repo => repo.language?.toLowerCase() === languageFilter.value
    )
  }

  // Apply sorting (if needed - GitHub API usually handles sorting)
  // This is for client-side sorting if needed
  switch (sortFilter?.value) {
    case 'stars':
      return filteredRepositories.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      )
    default:
      return filteredRepositories
  }
}

/**
 * Selects the total count from search results
 */
export const selectTotalCount = (data?: SearchResultsResponse): number => {
  return data?.count || 0
}

/**
 * Selects repositories from search results
 */
export const selectRepositories = (
  data?: SearchResultsResponse
): SearchResultsResponse['items'] => {
  return data?.items || []
}

/**
 * Checks if search should be enabled
 */
export const selectIsSearchEnabled = (lastSearched: string): boolean => {
  return Boolean(lastSearched.trim())
}
