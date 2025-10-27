import { memo } from 'react'

import { COUNTER_ICONS_MAP } from './constants'

import type { CounterCardProps } from './types'

export const CounterCard = memo(({ counter }: CounterCardProps) => {
  const Icon = COUNTER_ICONS_MAP[counter.key]

  return (
    <div className='cc-card flex flex-col justify-between p-6'>
      <span className='text-md flex items-center gap-1 text-white/60'>
        <Icon width={20} /> {counter.label}
      </span>
      <div className='mt-1 text-3xl font-medium tracking-tight text-[var(--color-theme-primary-400)]'>
        <span>{counter.value}</span>
      </div>
    </div>
  )
})
