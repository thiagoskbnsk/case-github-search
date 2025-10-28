import { THEMES } from './constants'

import type { Theme } from './types'

/**
 * Validates if a theme is valid
 */
export const isValidTheme = (theme: string): theme is Theme => {
  return THEMES.includes(theme as Theme)
}

/**
 * Gets theme from localStorage with validation
 */
export const getStoredTheme = (storageKey: string, defaultTheme: Theme): Theme => {
  const stored = localStorage.getItem(storageKey)

  if (stored && isValidTheme(stored)) {
    return stored
  }

  return defaultTheme
}
