import { Card } from './Card'
import { EndOfResults } from '../EndOfResults'
import { InfiniteScrollTrigger } from '../InfiniteScrollTrigger'
import { useResultsListLogic } from './hooks'

export const ResultsList = () => {
  const { repositories, hasNextPage, showEndMessage, handleClick } = useResultsListLogic()

  return (
    <div>
      <ul className='cc-grid-template gap-4'>
        {repositories.map(repository => (
          <li key={repository.id}>
            <Card repository={repository} onClick={() => handleClick(repository.id)} />
          </li>
        ))}
      </ul>

      {hasNextPage && <InfiniteScrollTrigger />}
      {showEndMessage && <EndOfResults />}
    </div>
  )
}
