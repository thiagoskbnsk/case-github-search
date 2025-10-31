import { Page, Locator } from '@playwright/test'

import { SELECTORS, EXPECTED_TEXTS, ROUTES } from '../constants'

export class DetailsPage {
  readonly page: Page
  readonly $heading: Locator
  readonly $description: Locator
  readonly $ownerLabel: Locator
  readonly $repositoryLabel: Locator
  readonly $starsLabel: Locator
  readonly $forksLabel: Locator
  readonly $backLink: Locator

  constructor(page: Page) {
    this.page = page
    this.$heading = page.getByRole(SELECTORS.detailsHeading.role, { name: SELECTORS.detailsHeading.name })
    this.$description = page.getByText(EXPECTED_TEXTS.detailsDescription)
    this.$ownerLabel = page.getByText(EXPECTED_TEXTS.ownerLabel)
    this.$repositoryLabel = page.getByText(EXPECTED_TEXTS.repositoryLabel).first()
    this.$starsLabel = page.getByText(EXPECTED_TEXTS.starsLabel)
    this.$forksLabel = page.getByText(EXPECTED_TEXTS.forksLabel)
    this.$backLink = page.getByRole(SELECTORS.backLink.role, { name: SELECTORS.backLink.name })
  }

  async goto(repoId: string) {
    await this.page.goto(ROUTES.repository(repoId))
  }

  async goBack() {
    await this.$backLink.click()
  }
}
