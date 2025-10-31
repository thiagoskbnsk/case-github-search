import { test as base } from '@playwright/test'

import { DetailsPage } from './poms/DetailsPage'
import { NotFoundPage } from './poms/NotFoundPage'
import { SearchPage } from './poms/SearchPage'

type CustomFixtures = {
  searchPage: SearchPage
  detailsPage: DetailsPage
  notFoundPage: NotFoundPage
}

export const test = base.extend<CustomFixtures>({
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page)
    await searchPage.goto()
    await use(searchPage)
  },

  detailsPage: async ({ page }, use) => {
    const detailsPage = new DetailsPage(page)
    await use(detailsPage)
  },

  notFoundPage: async ({ page }, use) => {
    const notFoundPage = new NotFoundPage(page)
    await use(notFoundPage)
  },
})

export { expect } from '@playwright/test'
