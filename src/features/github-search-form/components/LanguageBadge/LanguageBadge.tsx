import { memo } from 'react'
import { clsx } from 'clsx'

type LanguageBadgeProps = {
  language: string
  hasLanguage: boolean
}

export const LanguageBadge = memo(({ language, hasLanguage }: LanguageBadgeProps) => {
  const languageColor = hasLanguage ? 'cyan' : 'gray'

  return (
    <span
      className={clsx(
        'rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap ring-1 ring-inset',
        `bg-${languageColor}-500/10 ring-${languageColor}-500/10 text-${languageColor}-500`
      )}>
      {language}
    </span>
  )
})

LanguageBadge.displayName = 'LanguageBadge'
