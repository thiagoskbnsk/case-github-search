import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { useResultsList } from '@features/github-search-form/contexts/github-search'
import { useEvents } from '@shared/events/useEvents'

import { Card } from './Card'

export const ResultsList = () => {
  const { repositories } = useResultsList()
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

  return (
    <ul className='cc-grid-template gap-4'>
      {repositories.map(repository => (
        <li key={repository.id}>
          <Card repository={repository} onClick={() => handleClick(repository.id)} />
        </li>
      ))}
    </ul>
  )
}
