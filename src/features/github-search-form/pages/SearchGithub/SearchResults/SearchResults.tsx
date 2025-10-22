import { use } from 'react'

import { PanelNotification } from '@shared/components'

import { Filter } from './Filter'
import { ResultsList } from './ResultsList'
import { FEEDBACK_MESSAGES } from '../../../constants/placeholders'
import { useSearchResults } from '../../../contexts/GithubSearch'

export const SearchResults = () => {
  const { error, noResults, searchPromise } = useSearchResults()

  use(searchPromise)

  if (error) {
    return <PanelNotification variant="error">{FEEDBACK_MESSAGES.error}</PanelNotification>
  }

  if (noResults) {
    return <PanelNotification variant="warning">{FEEDBACK_MESSAGES.noResults}</PanelNotification>
  }

  return (
    <div className="cc-grid-template gap-6 border-t border-white/10 pt-8">
      <Filter />
      <ResultsList />
    </div>
  )
}
