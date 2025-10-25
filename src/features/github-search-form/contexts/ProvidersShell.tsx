import { GithubSearchProvider } from './github-search'

export const ProvidersShell = ({ children }: React.PropsWithChildren) => {
  return <GithubSearchProvider>{children}</GithubSearchProvider>
}
