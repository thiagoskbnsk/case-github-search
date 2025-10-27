import { useCallback, useRef } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { useNavigate } from 'react-router'

import { useResultsList, useGithubSearchPagination } from '@features/github-search-form/providers'
import { useEvents } from '@shared/events/useEvents'

export const useResultsListLogic = () => {
  const { repositories } = useResultsList()
  const { hasNextPage, showEndMessage } = useGithubSearchPagination()
  const navigate = useNavigate()
  const { emit } = useEvents()

  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useWindowVirtualizer({
    count: repositories.length,
    estimateSize: () => 140, // Reduced estimate - actual size will be measured
    overscan: 5,
  })

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
    parentRef,
    virtualizer,
  }
}
