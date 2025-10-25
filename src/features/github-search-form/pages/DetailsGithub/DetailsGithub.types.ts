import type { repositoryParamsSchema } from './schemas'
import type { RepositoryUI } from '../../services/github/repositories/RepositoriesService.types'
import type { z } from 'zod'

export type RepositoryParams = z.infer<typeof repositoryParamsSchema>

export type DataKeyItem = {
  key: string
  label: string
  renderKey: string
}

export type MappedData = Omit<DataKeyItem, 'renderKey'> & {
  value: string
}

export type UseDetailsGithubResult<T extends boolean = boolean> = {
  repository: T extends true ? RepositoryUI : null
  hasRepository: T
  countersMap: MappedData[]
  repositoryInfoMap: MappedData[]
}
