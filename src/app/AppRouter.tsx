import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'

import { RedirectRoute } from '@shared/components'

import { AppLayout } from './AppLayout'
import { EventDebugger } from '../shared/components/ui/EventDebugger/EventDebugger'
import { usePerformanceListener, useSearchAnalyticsListener } from '../shared/events/eventListeners'

const NotFoundPage = lazy(() => import('./NotFound'))
const GithubSearchFormRouter = lazy(() => import('@features/github-search-form/Router'))

export const AppRouter = () => {
  /**
   *  TODO: should be called here?
   * if they are all middlewares, why do I need to call them?
   */
  useSearchAnalyticsListener()
  usePerformanceListener()

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
      <EventDebugger />
    </BrowserRouter>
  )
}
