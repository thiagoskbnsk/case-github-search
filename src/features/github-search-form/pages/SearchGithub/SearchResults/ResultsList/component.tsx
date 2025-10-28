import { Card } from './Card'
import { EndOfResults } from '../EndOfResults'
import { InfiniteScrollTrigger } from '../InfiniteScrollTrigger'
import { useResultsListLogic } from './hooks'

export const ResultsList = () => {
  const { repositories, hasNextPage, showEndMessage, handleClick, parentRef, virtualizer } = useResultsListLogic()

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div ref={parentRef} className='w-full'>
      <div
        className='relative mb-4 w-full'
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}>
        {virtualItems.map(virtualItem => {
          const repository = repositories[virtualItem.index]

          return (
            <div
              key={repository.id}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              className='absolute top-0 left-0 w-full pb-2'
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}>
              <Card repository={repository} onClick={() => handleClick(repository.id, repository)} />
            </div>
          )
        })}
      </div>

      {hasNextPage && <InfiniteScrollTrigger />}
      {showEndMessage && <EndOfResults />}
    </div>
  )
}
