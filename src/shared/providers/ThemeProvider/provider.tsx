import { useState, useEffect, useMemo } from 'react'

import { ThemeContext } from './context'
import { getStoredTheme } from './helpers'
import { THEME_STORAGE_KEY, DEFAULT_THEME } from './constants'

import type { Theme } from './types'

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme(THEME_STORAGE_KEY, DEFAULT_THEME))

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)

    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
