import { Page, Locator } from '@playwright/test'

import { SELECTORS, ROUTES, VALID_SEARCH_TERMS, TIMEOUTS, ERROR_MESSAGES } from '../constants'

export class SearchPage {
  readonly page: Page
  readonly $searchInput: Locator
  readonly $searchButton: Locator
  readonly $repositoryCards: Locator
  readonly $heading: Locator
  readonly $description: Locator

  constructor(page: Page) {
    this.page = page
    this.$searchInput = page.getByRole(SELECTORS.searchInput.role, { name: SELECTORS.searchInput.name })
    this.$searchButton = page.getByRole(SELECTORS.searchButton.role, { name: SELECTORS.searchButton.name })
    this.$repositoryCards = page.getByRole(SELECTORS.repositoryCard.role)
    this.$heading = page.getByRole(SELECTORS.heading.role, { name: SELECTORS.heading.name })
    this.$description = page.getByText(SELECTORS.heading.name as RegExp)
  }

  async goto() {
    await this.page.goto(ROUTES.home)
  }

  async search(term: string = VALID_SEARCH_TERMS[0]) {
    await this.$searchInput.fill(term)
    await this.$searchButton.click()
    await this.$repositoryCards.first().waitFor({ timeout: TIMEOUTS.cardLoad })
  }

  async fillSearchInput(term: string) {
    await this.$searchInput.fill(term)
  }

  async submitSearch() {
    await this.$searchButton.click()
  }

  async pressEnter() {
    await this.page.keyboard.press('Enter')
  }

  async clearInput() {
    await this.$searchInput.clear()
  }

  getErrorMessage(type: 'minLength' | 'maxLength' | 'onlyWhitespace' | 'invalidCharacters') {
    return this.page.getByText(ERROR_MESSAGES[type])
  }
}
