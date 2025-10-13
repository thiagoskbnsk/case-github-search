import { Loading, PanelNotification } from '@shared/components'

import { FEEDBACK_MESSAGES } from '../../constants/placeholders'
import { useSearchResults } from '../../contexts/GithubSearch'
import { Filter } from '../Filter'
import { ResultsList } from '../ResultsList'

export const SearchResults = () => {
  const { error, noResults, isLoading, shouldShowResults } = useSearchResults()

  if (isLoading) return <Loading />

  if (error) {
    return (
      <PanelNotification variant="error">
        {FEEDBACK_MESSAGES.error}
      </PanelNotification>
    )
  }

  if (noResults) {
    return (
      <PanelNotification variant="warning">
        {FEEDBACK_MESSAGES.noResults}
      </PanelNotification>
    )
  }

  if (!shouldShowResults) return null

  return (
    <div className="grid gap-6 border-t border-white/10 pt-6">
      <Filter />

      <ResultsList />
    </div>
  )
}
