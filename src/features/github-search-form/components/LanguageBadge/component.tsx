import { memo } from 'react'

import type { LanguageBadgeProps } from './types'

export const LanguageBadge = memo(({ language, hasLanguage }: LanguageBadgeProps) => {
  const badgeClass = hasLanguage ? 'badge-primary' : 'badge-secondary'

  return (
    <span className={`rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap ring-1 ring-inset ${badgeClass}`}>
      {language}
    </span>
  )
})

LanguageBadge.displayName = 'LanguageBadge'
