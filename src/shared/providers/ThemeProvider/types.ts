import type { THEMES } from './constants'

export type Theme = (typeof THEMES)[number]

export type Selector<T> = (state: ThemeProviderState) => T

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}
