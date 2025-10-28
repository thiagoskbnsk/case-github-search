import type { MappedData } from '../types'
import type { RepositoryUI } from '@features/github-search-form/api/github/repositories'

export type RepositoryInfoItemProps = {
  info: MappedData
  repository: RepositoryUI
}
