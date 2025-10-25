import { memo } from 'react'
import { Link } from 'react-router'

import { GithubIcon } from '@features/github-search-form/components'

import { DEFAULT_TEXTS } from './DetailsGithubHeader.placeholders'

import type { DetailsGithubHeaderProps } from './DetailsGithubHeader.types'

export const DetailsGithubHeader = memo(({ repositoryUrl, ownerName, repositoryName }: DetailsGithubHeaderProps) => {
  return (
    <>
      <Link
        to='/'
        className='transition:all mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-500 duration-200
          hover:text-gray-300'>
        <span aria-hidden='true'>&larr;</span> go back
      </Link>
      <div className='flex w-full items-center justify-between'>
        <div className='w-full'>
          <h3 className='text-base/7 font-semibold text-white'>{DEFAULT_TEXTS.title}</h3>
          <p className='mt-1 max-w-2xl text-sm/6 text-gray-400'>{DEFAULT_TEXTS.description}</p>
        </div>
        <a
          href={repositoryUrl}
          target='_blank'
          onClick={event => event.stopPropagation()}
          rel='noopener noreferrer'
          aria-label={`Open ${ownerName}/${repositoryName} repository on GitHub`}
          className='focus:ring-purple-50-500 inline-flex items-center justify-center rounded-full focus:ring-2
            focus:outline-none'>
          <GithubIcon size={48} />
        </a>
      </div>
    </>
  )
})
