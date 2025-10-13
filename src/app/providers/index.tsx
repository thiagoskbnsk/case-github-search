import { ReactQueryProvider } from './ReactQuery'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}
