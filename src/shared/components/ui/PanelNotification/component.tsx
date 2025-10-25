import React from 'react'
import { clsx } from 'clsx'

import { ICONS, VARIANT_STYLES } from './constants'

import type { PanelNotificationProps } from './types'

export const PanelNotification = ({ children, variant }: PanelNotificationProps) => {
  return (
    <span className={clsx('flex items-center gap-2 rounded-md px-4 py-3 text-sm', VARIANT_STYLES[variant])}>
      <span aria-hidden='true' className='size-4'>
        {React.createElement(ICONS[variant])}
      </span>
      <span>{children}</span>
    </span>
  )
}
