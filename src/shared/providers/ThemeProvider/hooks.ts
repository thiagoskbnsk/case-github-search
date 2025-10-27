import { useContextSelector } from 'use-context-selector'

import { ThemeContext } from './context'
import { THEMES } from './constants'

import type { Selector } from './types'

export const useTheme = <T>(selector: Selector<T>) =>
  useContextSelector(ThemeContext, state => {
    if (!state) {
      throw new Error('useTheme must be used within ThemeProvider')
    }

    return selector(state)
  })

export const useThemeSwitch = () =>
  useTheme(state => ({
    setTheme: state.setTheme,
    theme: state.theme,
    themes: THEMES,
  }))
