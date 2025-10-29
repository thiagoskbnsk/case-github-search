import { memo } from 'react'
import { StarIcon } from '@heroicons/react/16/solid'
import { clsx } from 'clsx'

import { GithubIcon, LanguageBadge } from '@features/github-search-form/components'

import type { CardProps } from './types'

export const Card = memo(
  ({
    repository: { name, owner, formattedStars, displayDescription, displayLanguage, hasDescription, hasLanguage, url },
    onClick,
  }: CardProps) => {
    return (
      <article
        onClick={onClick}
        data-testid='repository-card'
        aria-label={`${owner.name}/${name} repository`}
        className='cc-card origin-center cursor-pointer rounded-md opacity-60 transition-all duration-200 ease-in-out
          will-change-transform hover:scale-[1.02] hover:opacity-100'>
        <div className='flex items-center justify-between border-b border-white/10 p-4'>
          <p className='relative top-[-2px] flex max-w-6/12 items-center gap-1 overflow-hidden text-sm text-white'>
            <span className='inline-flex items-center gap-1 text-left text-sm font-medium'>
              <img
                src={owner.avatar}
                alt={`${owner.name} avatar`}
                className='relative top-[1px] inline-block h-4 w-4 shrink-0 rounded-full bg-white'
                width='16'
                height='16'
                loading='lazy'
              />
              <span className='truncate'>{owner.name}</span>
            </span>
            <span className='shrink-0'>/</span>
            <span className='truncate text-left text-sm font-medium text-white'>{name}</span>
          </p>
          <div className='flex max-w-6/12 items-start gap-x-2'>
            <LanguageBadge language={displayLanguage} hasLanguage={hasLanguage} />
            <span
              className='flex gap-1 rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium
                text-[var(--color-theme-primary-400)] ring-1 ring-[var(--color-theme-primary-400)]/10 ring-inset'>
              <StarIcon width={16} height={16} /> {formattedStars}
            </span>
            <a
              href={url}
              target='_blank'
              onClick={event => event.stopPropagation()}
              rel='noopener noreferrer'
              aria-label={`Open ${owner.name}/${name} repository on GitHub`}
              className='flex h-full w-full items-center rounded-md bg-white/10 px-2 py-1 text-xs ring-1 ring-white/50
                ring-inset hover:bg-white/20 focus:ring-2 focus:ring-white focus:outline-none'>
              <GithubIcon />
            </a>
          </div>
        </div>
        <div className='p-4 text-left text-sm'>
          <p className={clsx('line-clamp-2 break-words', hasDescription ? 'text-white/80' : 'text-white/30 italic')}>
            {displayDescription}
          </p>
        </div>
      </article>
    )
  }
)
