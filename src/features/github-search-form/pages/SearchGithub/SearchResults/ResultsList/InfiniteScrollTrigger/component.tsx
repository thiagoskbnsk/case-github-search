import { SkeletonList } from '../skeleton'
import { useInfiniteScrollTrigger } from './hooks'

export const InfiniteScrollTrigger = () => {
  const { targetRef, isLoading } = useInfiniteScrollTrigger()

  return (
    <div ref={targetRef} className='flex justify-center'>
      {isLoading && <SkeletonList />}
    </div>
  )
}
