import { useCallback, useMemo } from 'react'

import type { Repository } from '@shared/services/github/endpoints/repositories.service'

import type { SortOptionValues } from '../../constants/sort-options'
import { useResultsList } from '../../contexts/GithubSearch'
import { Card } from '../Card'
import type { Filters } from './types'

export const ResultsList = () => {
  const { repositories, languageFilter, sortFilter } = useResultsList()

  const filterRepositories = useCallback(
    (repos: Repository[], filteredBy: string) => {
      if (!filteredBy) return repos

      return repos.filter(repo => repo.language?.toLowerCase() === filteredBy)
    },
    []
  )

  const sortRepositories = useCallback(
    (repos: Repository[], sortedBy: SortOptionValues) => {
      if (sortedBy === 'best-match') return repos

      return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)
    },
    []
  )

  const handleFilterAndSort = useCallback(
    (repos: Repository[], { filteredBy, sortedBy }: Filters) => {
      const filteredList = filterRepositories(repos, filteredBy)
      const sortedList = sortRepositories(filteredList, sortedBy)

      return sortedList
    },
    [filterRepositories, sortRepositories]
  )

  const filteredRepositories = useMemo(
    () =>
      handleFilterAndSort(repositories, {
        filteredBy: languageFilter?.value || '',
        sortedBy: sortFilter?.value || 'best-match',
      }),
    [
      handleFilterAndSort,
      languageFilter?.value,
      repositories,
      sortFilter?.value,
    ]
  )

  return (
    <ul className="grid gap-4">
      {filteredRepositories.map(repository => (
        <li key={repository.id}>
          <Card
            description={repository.description}
            language={repository.language}
            name={repository.name}
            ownerLogin={repository.owner.login}
            stargazersCount={repository.stargazers_count}
          />
        </li>
      ))}
    </ul>
  )
}
