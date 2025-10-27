import type { Theme } from '@shared/providers'

export const ARIA_LABELS = {
  container: 'Theme switcher',
  themeButton: (theme: string) => `Switch to ${theme} theme`,
}

export const THEME_NAMES: Record<Theme, string> = {
  mindfulness: 'Mindfulness',
  'sunset-flame': 'Sunset Flame',
  'deep-ocean': 'Deep Ocean',
} as const
