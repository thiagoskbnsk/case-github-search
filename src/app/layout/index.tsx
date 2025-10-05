import type { ReactNode } from 'react'

type AppLayoutProps = {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="app-container">
      <main>{children}</main>
    </div>
  )
}
