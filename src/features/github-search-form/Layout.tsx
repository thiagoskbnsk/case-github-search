import { Outlet } from 'react-router'

import { ProvidersShell } from './ProvidersShell'

const Layout = () => {
  return (
    <ProvidersShell>
      <div className='mx-auto max-w-3xl px-6 py-10 sm:px-16'>
        <Outlet />
      </div>
    </ProvidersShell>
  )
}

export default Layout
