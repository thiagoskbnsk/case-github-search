import React from 'react'
import { ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/16/solid'
import { clsx } from 'clsx'

type PanelNotificationProps = React.PropsWithChildren<{
  variant: 'error' | 'warning'
}>

const VARIANT_STYLES = {
  error: 'bg-red-400/10 text-red-400',
  warning: 'bg-amber-400/10 text-amber-400',
}

const ICONS = {
  error: ExclamationCircleIcon,
  warning: InformationCircleIcon,
}

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
