import { ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/16/solid'

import type { IconComponent, PanelNotificationVariant } from './PanelNotification.types'

export const VARIANT_STYLES: Record<PanelNotificationVariant, string> = {
  error: 'bg-red-400/10 text-red-400',
  warning: 'bg-amber-400/10 text-amber-400',
}

export const ICONS: Record<PanelNotificationVariant, IconComponent> = {
  error: ExclamationCircleIcon,
  warning: InformationCircleIcon,
}
