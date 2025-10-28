import { use } from 'react'

import { useSearchResults } from '@features/github-search-form/providers'
import { PanelNotification } from '@shared/components'

import { Filter } from './Filter'
import { FEEDBACK_MESSAGES } from './placeholders'
import { ResultsList } from './ResultsList'

export const SearchResults = () => {
  const { error, noResults, fetchSearchResultsPromise } = useSearchResults()

  use(fetchSearchResultsPromise)

  if (error) {
    return <PanelNotification variant='error'>{FEEDBACK_MESSAGES.error}</PanelNotification>
  }

  if (noResults) {
    return <PanelNotification variant='warning'>{FEEDBACK_MESSAGES.noResults}</PanelNotification>
  }

  return (
    <div className='cc-grid-template gap-6 border-t border-white/10 pt-8'>
      <Filter />
      <ResultsList />
    </div>
  )
}
