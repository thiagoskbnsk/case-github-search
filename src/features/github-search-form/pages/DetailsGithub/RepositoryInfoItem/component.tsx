import { memo, useMemo } from 'react'
import { clsx } from 'clsx'

import { LanguageBadge } from '@features/github-search-form/components'

import type { RepositoryInfoItemProps } from './types'

export const RepositoryInfoItem = memo(({ info, repository }: RepositoryInfoItemProps) => {
  const getValueContent = useMemo(() => {
    if (info.label === 'Language') {
      return <LanguageBadge language={info.value} hasLanguage={repository.hasLanguage} />
    }

    if (info.label === 'Description') {
      return (
        <span className={clsx('break-words', { 'text-neutral-600 italic': !repository.hasDescription })}>
          {info.value}
        </span>
      )
    }

    return <span className='break-words'>{info.value}</span>
  }, [info.value, info.label, repository.hasDescription, repository.hasLanguage])

  return (
    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <span className='text-sm/6 font-medium text-gray-100'>{info.label}</span>
      <div className='mt-1 overflow-hidden pb-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0'>{getValueContent}</div>
    </div>
  )
})
