import { get as getNestedValue } from 'lodash'

import { DATA_KEYS } from './DetailsGithub.constants'
import { repositoryParamsSchema } from './DetailsGithub.schemas'

import type { DataKeyItem, MappedData } from './DetailsGithub.types'
import type { RepositoryUI } from '../../services/github/repositories/RepositoriesService.types'
import type { Params } from 'react-router'

export const validateParams = (params: Params<string>) => {
  const { success, data } = repositoryParamsSchema.safeParse(params)

  return success ? data : null
}

export const getValueFromRenderKey = (repository: RepositoryUI, renderKey: string) => {
  return renderKey.includes('.') ? getNestedValue(repository, renderKey) : repository[renderKey as keyof RepositoryUI]
}

export const mapDataKeys = (repository: RepositoryUI, keys: DataKeyItem[]): MappedData[] => {
  return keys.map(({ key, label, renderKey }) => ({
    key,
    label,
    value: getValueFromRenderKey(repository, renderKey),
  }))
}

export const getCountersMap = (repository: RepositoryUI | null): MappedData[] => {
  if (!repository) return []

  return mapDataKeys(repository, [DATA_KEYS.STARS, DATA_KEYS.FORKS, DATA_KEYS.OPEN_ISSUES])
}

export const getRepositoryInfoMap = (repository: RepositoryUI | null): MappedData[] => {
  if (!repository) return []

  return mapDataKeys(repository, [DATA_KEYS.OWNER, DATA_KEYS.REPOSITORY, DATA_KEYS.DESCRIPTION, DATA_KEYS.LANGUAGE])
}
