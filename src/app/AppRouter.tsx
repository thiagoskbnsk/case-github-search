import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'

import { RedirectRoute } from '@shared/components'

const AppLayout = lazy(() => import('./AppLayout'))
const NotFoundPage = lazy(() => import('./NotFound'))
const GithubSearchFormRouter = lazy(() => import('@features/github-search-form/Router'))

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='*' element={<GithubSearchFormRouter />} />

            <Route path='/404' element={<NotFoundPage />} />
            <Route path='*' element={<RedirectRoute to='/404' statusCode={404} />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
