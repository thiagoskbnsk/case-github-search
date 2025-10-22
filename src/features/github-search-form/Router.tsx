import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'

import { RedirectRoute } from '@shared/components'

const SearchGithubPage = lazy(() => import('./pages/SearchGithub'))
const DetailsGithubPage = lazy(() => import('./pages/DetailsGithub'))

const Layout = lazy(() => import('./Layout'))

const GithubSearchForm = () => {
  return (
    <Suspense>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<SearchGithubPage />} />
          <Route path='repository/:repositoryId' element={<DetailsGithubPage />} />
          {/* TODO: is this redirect, redirecting again? */}
          <Route path='*' element={<RedirectRoute to='/404' statusCode={404} />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default GithubSearchForm
