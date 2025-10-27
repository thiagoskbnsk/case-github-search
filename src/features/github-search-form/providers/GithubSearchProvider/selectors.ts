import { DEFAULT_LANGUAGE_FILTER, type SortOptionValues } from '../../pages/SearchGithub/SearchResults/Filter/filters'

import type { RepositoryUI } from '../../api/github/repositories'
import type { Filters } from '../../pages/SearchGithub/SearchResults/ResultsList/types'
import type { Option } from '@shared/components'

/**
 * Selects unique language options from repositories
 */
export const selectLanguageOptions = (repositories: RepositoryUI[]): Option[] => {
  const uniqueLanguages = repositories
    .map(repository => repository.language)
    .filter((language): language is string => Boolean(language))

  const uniqueLanguagesSet = new Set(uniqueLanguages)

  const languagesList = [...uniqueLanguagesSet].map(language => ({
    id: language,
    label: language,
    value: language?.toLowerCase(),
  }))

  return [DEFAULT_LANGUAGE_FILTER, ...languagesList]
}

const filterRepositories = (repositories: RepositoryUI[], filteredBy: string) => {
  if (!filteredBy) return repositories

  return repositories.filter(repository => repository.language?.toLowerCase() === filteredBy)
}

const sortRepositories = (repositories: RepositoryUI[], sortedBy: SortOptionValues) => {
  switch (sortedBy) {
    case 'stargazed':
      return repositories.sort((a, b) => b.stars - a.stars)
    default:
      return repositories
  }
}

/**
 * Selects repositories based on language and sort filters
 */
export const handleFilterAndSort = (repositories: RepositoryUI[], { filteredBy, sortedBy }: Filters) => {
  const repositoriesCopy = [...repositories]

  const filteredList = filterRepositories(repositoriesCopy, filteredBy)
  const sortedList = sortRepositories(filteredList, sortedBy)

  return sortedList
}

/**
 * Finds a repository by its ID
 */
export const findRepositoryById = (repositories: RepositoryUI[], repositoryId: number): RepositoryUI | null => {
  const repository = repositories.find(repo => repo.id === repositoryId)

  return repository || null
}
