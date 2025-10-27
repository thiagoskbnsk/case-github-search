import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { useResultsList, useGithubSearchPagination } from '@features/github-search-form/providers'
import { useEvents } from '@shared/events/useEvents'

export const useResultsListLogic = () => {
  const { repositories } = useResultsList()
  const { hasNextPage, showEndMessage } = useGithubSearchPagination()
  const navigate = useNavigate()
  const { emit } = useEvents()

  const handleClick = useCallback(
    (id: number) => {
      emit('REPOSITORY_SELECTED', {
        repositoryId: id,
        repositoryName: 'EXAMPLE',
        source: 'search_results',
      })

      navigate(`/repository/${id}`)
    },
    [navigate, emit]
  )

  return {
    repositories,
    hasNextPage,
    showEndMessage,
    handleClick,
  }
}
