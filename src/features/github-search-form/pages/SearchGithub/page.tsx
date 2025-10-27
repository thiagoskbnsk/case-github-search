import { lazy } from 'react'

import { SuspenseWrapper } from '@shared/components'

import { DEFAULT_TEXTS } from './placeholders'
import { SearchForm } from './SearchForm'
import { useSearchResults } from '../../providers'

const SearchResults = lazy(() => import('./SearchResults'))

export const SearchGithub = () => {
  const { shouldShowResults } = useSearchResults()

  return (
    <div className='relative grid gap-6 text-center'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight text-balance text-white sm:text-3xl'>
          {DEFAULT_TEXTS.title}
        </h1>
        <p className='mx-auto mt-3 max-w-xl text-sm text-pretty text-gray-300'>{DEFAULT_TEXTS.description}</p>
      </div>

      <div className='cc-grid-template gap-3'>
        <SearchForm />

        <SuspenseWrapper isFetching={shouldShowResults} loadingFallback={null}>
          <SearchResults />
        </SuspenseWrapper>
      </div>
    </div>
  )
}
