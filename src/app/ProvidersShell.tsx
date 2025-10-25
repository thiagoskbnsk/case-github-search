import { ReactQueryProvider } from '@shared/providers'

export const ProvidersShell = ({ children }: React.PropsWithChildren) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}
