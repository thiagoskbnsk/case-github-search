import { VALID_SEARCH_TERMS, EXPECTED_TEXTS } from '../fixtures/search-test-data'
import { test, expect } from '../fixtures/test-fixtures'

test.describe('Search Form - Happy Path', () => {
  test('should display search form on home page', async ({ searchPage }) => {
    await test.step('Verify page title', async () => {
      await expect(searchPage.page).toHaveTitle(EXPECTED_TEXTS.pageTitle)
    })

    await test.step('Verify heading is visible', async () => {
      await expect(searchPage.heading).toBeVisible()
    })

    await test.step('Verify description text', async () => {
      await expect(searchPage.page.getByText(EXPECTED_TEXTS.description)).toBeVisible()
    })

    await test.step('Verify search input is visible', async () => {
      await expect(searchPage.searchInput).toBeVisible()
      await expect(searchPage.searchInput).toHaveAttribute('placeholder', EXPECTED_TEXTS.inputPlaceholder)
    })

    await test.step('Verify search button is visible', async () => {
      await expect(searchPage.searchButton).toBeVisible()
    })
  })

  test('should submit search and display results', async ({ searchPage }) => {
    const validSearchTerm = VALID_SEARCH_TERMS[0]

    await test.step('Fill search input with valid query', async () => {
      await searchPage.fillSearchInput(validSearchTerm)
      await expect(searchPage.searchInput).toHaveValue(validSearchTerm)
    })

    await test.step('Submit search form', async () => {
      await searchPage.submitSearch()
    })

    await test.step('Verify loading state appears', async () => {
      await expect(searchPage.searchButton).toBeDisabled()
    })

    await test.step('Wait for results to load', async () => {
      await expect(searchPage.repositoryCards.first()).toBeVisible({ timeout: 10000 })
    })

    await test.step('Verify filter controls appear', async () => {
      const sortDropdown = searchPage.page.getByRole('combobox').first()
      const languageDropdown = searchPage.page.getByRole('combobox').last()

      await expect(sortDropdown).toBeVisible()
      await expect(languageDropdown).toBeVisible()
    })

    await test.step('Verify repository cards display correctly', async () => {
      const count = await searchPage.repositoryCards.count()
      expect(count).toBeGreaterThan(0)
      await expect(searchPage.repositoryCards.first()).toBeVisible()
    })
  })

  test('should allow clearing search input', async ({ searchPage }) => {
    await test.step('Fill search input', async () => {
      await searchPage.fillSearchInput('typescript')
      await expect(searchPage.searchInput).toHaveValue('typescript')
    })

    await test.step('Submit search', async () => {
      await searchPage.search('typescript')
    })

    await test.step('Clear search input by selecting and deleting', async () => {
      await searchPage.searchInput.click({ clickCount: 3 })
      await searchPage.searchInput.press('Backspace')
      await expect(searchPage.searchInput).toHaveValue('')
    })

    await test.step('Verify form state after clearing', async () => {
      await expect(searchPage.searchButton).toBeDisabled()
    })
  })

  test('should maintain search term in input after submission', async ({ searchPage }) => {
    const searchTerm = 'vue'

    await test.step('Submit search', async () => {
      await searchPage.search(searchTerm)
    })

    await test.step('Verify search term persists in input', async () => {
      await expect(searchPage.searchInput).toHaveValue(searchTerm)
    })
  })
})
