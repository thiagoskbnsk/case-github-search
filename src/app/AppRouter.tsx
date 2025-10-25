import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'

import { EventDebugger } from '@shared/components'

import { AppLayout } from './AppLayout'

const NotFoundPage = lazy(() => import('./pages/NotFound'))
const GithubSearchFormRouter = lazy(() => import('@features/github-search-form/Router'))

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/*' element={<GithubSearchFormRouter />} />
            <Route path='/404' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <EventDebugger />
    </BrowserRouter>
  )
}
