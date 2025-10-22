import { memo, useMemo } from 'react'
import { clsx } from 'clsx'

import type { RepositoryInfoItemProps } from './types'

export const RepositoryInfoItem = memo(({ info, repository }: RepositoryInfoItemProps) => {
  const languageColor = repository?.hasLanguage ? 'cyan' : 'gray'

  const getValueContent = useMemo(() => {
    if (info.label === 'Language') {
      return (
        <span
          className={clsx(
            'rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap ring-1 ring-inset',
            `bg-${languageColor}-500/10 ring-${languageColor}-500/10 text-${languageColor}-500`
          )}>
          {info.value}
        </span>
      )
    }

    if (info.label === 'Description') {
      return (
        <span className={clsx('break-words', { 'text-neutral-600 italic': !repository.hasDescription })}>
          {info.value}
        </span>
      )
    }

    return <span className='break-words'>{info.value}</span>
  }, [info.value, info.label, languageColor, repository.hasDescription])

  return (
    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <span className='text-sm/6 font-medium text-gray-100'>{info.label}</span>
      <div className='mt-1 overflow-hidden text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0'>{getValueContent}</div>
    </div>
  )
})
