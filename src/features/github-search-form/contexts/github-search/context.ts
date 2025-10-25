import { createContext } from 'use-context-selector'

import type { GithubSearchContextType } from './GithubSearchContext.types'

export const GithubSearchContext = createContext<GithubSearchContextType>({} as GithubSearchContextType)
