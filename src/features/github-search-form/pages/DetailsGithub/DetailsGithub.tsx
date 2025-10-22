import {Navigate} from 'react-router'

import {CounterCard} from './CounterCard'
import {DetailsGithubHeader} from './DetailsGithubHeader/DetailsGithubHeader'
import {RepositoryInfoItem} from './RepositoryInfoItem'
import {useDetailsGithub} from './useDetailsGithub'

export const DetailsGithub = () => {
  const {repository, hasRepository, countersMap, repositoryInfoMap} = useDetailsGithub()

  if (!hasRepository) {
    return (
      <Navigate
        to='/404'
        replace
        state={{title: 'Repo Not Found', description: 'The repository you are looking for does not exist.'}}
      />
    )
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
