import { Outlet } from 'react-router'

import { ProvidersShell } from './ProvidersShell'

export const AppLayout = () => {
  return (
    <ProvidersShell>
      <main className='container mx-auto px-4 py-28'>
        <Outlet />
      </main>
    </ProvidersShell>
  )
}
