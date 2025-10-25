import type { RepositoryUI } from '@features/github-search-form/api/github/repositories'

export type CardProps = {
  repository: RepositoryUI
  onClick: () => void
}
