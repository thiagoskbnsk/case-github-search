import { GithubSearchProvider } from './GithubSearch'

export const ProvidersShell = ({ children }: React.PropsWithChildren) => {
  return <GithubSearchProvider>{children}</GithubSearchProvider>
}
