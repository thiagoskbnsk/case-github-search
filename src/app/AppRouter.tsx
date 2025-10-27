import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'

import { isDev } from '@shared/utils'

import { AppLayout } from './AppLayout'

const NotFoundPage = lazy(() => import('./pages/NotFound'))
const GithubSearchFormRouter = lazy(() => import('@features/github-search-form/Router'))
const EventDebugger = lazy(() => import('@shared/components/ui/EventDebugger'))
const ErrorTest = lazy(() => import('@/shared/components/ui/ErrorBoundary/ErrorTest'))

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

      {isDev && (
        <>
          <EventDebugger />
          <ErrorTest />
        </>
      )}
    </BrowserRouter>
  )
}
