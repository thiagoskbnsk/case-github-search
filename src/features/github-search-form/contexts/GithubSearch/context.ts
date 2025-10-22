import { createContext } from 'use-context-selector'

import type { GithubSearchContextType } from './types'

export const GithubSearchContext = createContext<GithubSearchContextType>({} as GithubSearchContextType)
