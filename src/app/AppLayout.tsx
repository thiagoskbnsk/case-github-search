import { Outlet } from 'react-router'

import { ThemeSwitcher } from '@shared/components'
import { usePageView } from '@shared/hooks'

import { ProvidersShell } from './ProvidersShell'

export const AppLayout = () => {
  usePageView()

  return (
    <ProvidersShell>
      <div className='absolute top-6 right-6 z-50'>
        <ThemeSwitcher />
      </div>
      <main className='container mx-auto px-4 py-28'>
        <Outlet />
      </main>
    </ProvidersShell>
  )
}
