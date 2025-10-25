import type { RepositoryUI } from '../../../services/github/repositories/RepositoriesService.types'
import type { MappedData } from '../DetailsGithub.types'

export type RepositoryInfoItemProps = {
  info: MappedData
  repository: RepositoryUI
}
