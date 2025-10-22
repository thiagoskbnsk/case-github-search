import { Outlet } from 'react-router'

import { Providers } from './providers'

const AppLayout = () => {
  return (
    <Providers>
      <main className='container mx-auto px-4 py-28'>
        <Outlet />
      </main>
    </Providers>
  )
}

export default AppLayout
