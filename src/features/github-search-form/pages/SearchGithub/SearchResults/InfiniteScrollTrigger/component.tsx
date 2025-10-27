import { useInfiniteScrollTrigger } from './hooks'
import { DEFAULT_TEXTS } from './placeholders'

export const InfiniteScrollTrigger = () => {
  const { targetRef, isLoading } = useInfiniteScrollTrigger()

  return (
    <div ref={targetRef} className='flex justify-center py-8'>
      {isLoading && <div className='text-center text-white'>{DEFAULT_TEXTS.loadingMessage}</div>}
    </div>
  )
}
