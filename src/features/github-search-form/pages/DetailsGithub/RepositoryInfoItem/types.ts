import type { MappedData } from '../types'
import type { RepositoryUI } from '@shared/services/github/repositories/types'

export type RepositoryInfoItemProps = {
  info: MappedData
  repository: RepositoryUI
}
