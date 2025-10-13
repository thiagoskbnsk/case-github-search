import { Providers } from '../providers'

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Providers>
      <main className="container mx-auto px-4 py-28">{children}</main>
    </Providers>
  )
}
