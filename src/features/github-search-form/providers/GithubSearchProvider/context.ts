import { createContext } from 'use-context-selector'

import type { GithubSearchState } from './types'

export const GithubSearchContext = createContext<GithubSearchState>({} as GithubSearchState)
