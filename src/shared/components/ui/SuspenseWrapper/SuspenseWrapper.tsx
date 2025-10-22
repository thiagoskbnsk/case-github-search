import { Suspense } from 'react'

import { Loading } from '@shared/components'

import type { SuspenseWrapperProps } from './types'

export const SuspenseWrapper = ({ isFetching, children, loadingFallback = <Loading /> }: SuspenseWrapperProps) => {
  if (!isFetching) return null

  return <Suspense fallback={loadingFallback}>{children}</Suspense>
}
