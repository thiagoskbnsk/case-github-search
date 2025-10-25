import type { RepositoryUI } from '../../../api/github/repositories'
import type { MappedData } from '../types'

export type RepositoryInfoItemProps = {
  info: MappedData
  repository: RepositoryUI
}
