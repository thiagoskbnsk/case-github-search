import { type ComponentType } from 'react'
import { EyeIcon, StarIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/16/solid'

import { DATA_KEYS } from '../constants'

import type { IconProps } from './types'

export const COUNTER_ICONS_MAP: Record<string, ComponentType<IconProps>> = {
  [DATA_KEYS.STARS.key]: StarIcon,
  [DATA_KEYS.FORKS.key]: ArrowLeftStartOnRectangleIcon,
  [DATA_KEYS.OPEN_ISSUES.key]: EyeIcon,
}
