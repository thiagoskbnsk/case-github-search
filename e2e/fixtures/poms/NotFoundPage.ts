import { Page, Locator } from '@playwright/test'

import { EXPECTED_TEXTS, ROUTES } from '../constants'

export class NotFoundPage {
  readonly page: Page
  readonly $pageNotFoundMessage: Locator
  readonly $goBackHomeLink: Locator

  constructor(page: Page) {
    this.page = page
    this.$pageNotFoundMessage = page.getByText(EXPECTED_TEXTS.pageNotFound)
    this.$goBackHomeLink = page.getByText(EXPECTED_TEXTS.goBackHome)
  }

  async gotoUnknownRoute() {
    await this.page.goto(ROUTES.notFound)
  }

  async gotoInvalidRepository(repoId: string) {
    await this.page.goto(ROUTES.repository(repoId))
  }
}
