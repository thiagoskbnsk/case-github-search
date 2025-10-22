import { useMemo } from 'react'
import { useParams } from 'react-router'

import { validateParams, getCountersMap, getRepositoryInfoMap } from './selectors'
import { useRepositoryDetails } from '../../contexts/GithubSearch'

import type { UseDetailsGithubResult } from './types'

export function useDetailsGithub(): UseDetailsGithubResult<true> | UseDetailsGithubResult<false>
export function useDetailsGithub(): UseDetailsGithubResult {
  const params = useParams()
  const { getRepositoryById } = useRepositoryDetails()

  const validatedParams = useMemo(() => validateParams(params), [params])

  const repository = useMemo(
    () => (validatedParams ? getRepositoryById(validatedParams.repositoryId) : null),
    [validatedParams, getRepositoryById]
  )

  const countersMap = useMemo(() => getCountersMap(repository), [repository])

  const repositoryInfoMap = useMemo(() => getRepositoryInfoMap(repository), [repository])

  return {
    repository,
    hasRepository: Boolean(repository),
    countersMap,
    repositoryInfoMap,
  }
}
