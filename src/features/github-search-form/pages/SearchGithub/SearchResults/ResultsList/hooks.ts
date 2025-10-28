import { useCallback, useRef } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { useNavigate } from 'react-router'

import { useResultsList, useGithubSearchPagination } from '@features/github-search-form/providers'
import { useEvents } from '@shared/events/useEvents'

import type { RepositoryUI } from '@features/github-search-form/api/github'

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
    (id: number, repository: RepositoryUI) => {
      emit('CARD_CLICK', {
        repositoryId: id,
        repository,
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
