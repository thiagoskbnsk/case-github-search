import { GithubSearchProvider } from './providers'

export const ProvidersShell = ({ children }: React.PropsWithChildren) => {
  return <GithubSearchProvider>{children}</GithubSearchProvider>
}
