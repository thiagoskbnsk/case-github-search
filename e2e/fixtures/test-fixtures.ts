import { test as base } from '@playwright/test'

import { DetailsPage } from './pages/DetailsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SearchPage } from './pages/SearchPage'

type CustomFixtures = {
  searchPage: SearchPage
  detailsPage: DetailsPage
  notFoundPage: NotFoundPage
}

export const test = base.extend<CustomFixtures>({
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page)
    await searchPage.goto()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(searchPage)
  },

  detailsPage: async ({ page }, use) => {
    const detailsPage = new DetailsPage(page)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(detailsPage)
  },

  notFoundPage: async ({ page }, use) => {
    const notFoundPage = new NotFoundPage(page)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(notFoundPage)
  },
})

export { expect } from '@playwright/test'
