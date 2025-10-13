import { SearchForm } from '../SearchForm'
import { SearchResults } from '../SearchResults'

export const SearchGithub = () => {
  return (
    <div className="grid gap-6">
      <SearchForm />

      <SearchResults />
    </div>
  )
}
