import { RedirectRoute } from '@shared/components'
import { useDocumentMetadata } from '@shared/hooks'

import { CounterCard } from './CounterCard'
import { DetailsGithubHeader } from './DetailsGithubHeader/component'
import { useDetailsGithub } from './hooks'
import { RepositoryInfoItem } from './RepositoryInfoItem'
import { NOT_FOUND_STATE } from './constants'

export const DetailsGithub = () => {
  const { repository, hasRepository, countersMap, repositoryInfoMap } = useDetailsGithub()
  useDocumentMetadata({
    title: `Repository Details - ${repository?.name}`,
  })

  if (!hasRepository) {
    return <RedirectRoute to='/404' state={NOT_FOUND_STATE} />
  }

  return (
    <div>
      <DetailsGithubHeader
        ownerName={repository.owner.name}
        repositoryName={repository.name}
        repositoryUrl={repository.url}
      />
      <div className='mt-6 divide-y divide-white/10 border-t border-white/10'>
        {repositoryInfoMap.map(info => (
          <RepositoryInfoItem key={info.key} info={info} repository={repository} />
        ))}
      </div>
      <div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
        {countersMap.map(counter => (
          <CounterCard key={counter.key} counter={counter} />
        ))}
      </div>
    </div>
  )
}
