import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'

import { AppLayout } from './AppLayout'

const NotFoundPage = lazy(() => import('./pages/NotFound'))
const GithubSearchFormRouter = lazy(() => import('@features/github-search-form/Router'))
const EventDebugger = lazy(() => import('@shared/components/ui/EventDebugger'))

export const AppRouter = () => {
  const shouldEnableDebugger = import.meta.env.DEV

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
      {shouldEnableDebugger && <EventDebugger />}
    </BrowserRouter>
  )
}
