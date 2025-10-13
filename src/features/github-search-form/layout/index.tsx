import { Header } from './Header'
import { ProvidersShell } from '../contexts'

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ProvidersShell>
      <div className="mx-auto max-w-3xl">
        <div className="relative px-6 py-10 text-center sm:px-16">
          <Header />

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </ProvidersShell>
  )
}
