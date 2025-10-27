import { createContext } from 'use-context-selector'

import type { ThemeProviderState } from './types'

export const ThemeContext = createContext<ThemeProviderState>({} as ThemeProviderState)
