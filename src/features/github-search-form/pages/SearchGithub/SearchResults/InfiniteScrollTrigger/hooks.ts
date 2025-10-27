import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGithubSearchPagination } from '@features/github-search-form/providers'

import { FETCH_COOLDOWN_MS } from './constants'

export const useInfiniteScrollTrigger = () => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useGithubSearchPagination()
  const shouldFetchNextPage = useRef(true)

  const { ref: targetRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: '200px',
  })

  // avoid trigger nextPage before rendering all items
  useEffect(() => {
    if (!isFetchingNextPage && !shouldFetchNextPage.current) {
      setTimeout(() => {
        shouldFetchNextPage.current = true
      }, FETCH_COOLDOWN_MS)
    }
  }, [isFetchingNextPage])

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && shouldFetchNextPage.current) {
      shouldFetchNextPage.current = false

      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return {
    targetRef,
    isLoading: isFetchingNextPage,
  }
}
