import { ReactQueryProvider } from './ReactQuery'

export const ProvidersShell = ({ children }: React.PropsWithChildren) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}
