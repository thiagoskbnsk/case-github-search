import type React from 'react'

export type PanelNotificationVariant = 'error' | 'warning'

export type PanelNotificationProps = React.PropsWithChildren<{
  variant: PanelNotificationVariant
}>

export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>
