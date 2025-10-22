import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { Card } from './Card'
import { useResultsList } from '../../../../contexts/GithubSearch'

export const ResultsList = () => {
  const { repositories } = useResultsList()
  const navigate = useNavigate()

  const handleClick = useCallback(
    (id: number) => {
      navigate(`/repository/${id}`)
    },
    [navigate]
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
