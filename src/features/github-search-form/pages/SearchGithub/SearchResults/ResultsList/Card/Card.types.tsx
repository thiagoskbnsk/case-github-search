import type { RepositoryUI } from '@features/github-search-form/services/github/repositories/RepositoriesService.types'

export type CardProps = {
  repository: RepositoryUI
  onClick: () => void
}
