import { INVALID_SEARCH_TERMS, EDGE_CASE_SEARCHES } from '../../fixtures/constants'
import { test, expect } from '../../fixtures/base'
import { mockJsonResponse, setupApiMocks } from '../../fixtures/mockApi'
import { generateSearchResponse } from '../../fixtures/mockDataGenerators'

test.describe('Search Form - Validation', () => {
  test.beforeEach(async ({ page }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(generateSearchResponse()),
      },
    ])
  })

  test('should show error when submitting empty search', async ({ searchPage }) => {
    await test.step('Try to submit with empty input using Enter', async () => {
      await searchPage.$searchInput.focus()
      await searchPage.pressEnter()
    })

    await test.step('Verify button is still disabled for empty input', async () => {
      await expect(searchPage.$searchButton).toBeDisabled()
    })

    await test.step('Verify no results appear', async () => {
      await expect(searchPage.$repositoryCards).toHaveCount(0)
    })
  })

  test('should show error for search term less than 3 characters', async ({ searchPage }) => {
    await test.step('Enter 1 character', async () => {
      await searchPage.fillSearchInput(INVALID_SEARCH_TERMS.tooShort[0])
    })

    await test.step('Try to submit', async () => {
      await searchPage.submitSearch()
    })

    await test.step('Verify error message appears', async () => {
      await expect(searchPage.getErrorMessage('minLength')).toBeVisible()
    })

    await test.step('Verify submit button is disabled', async () => {
      await expect(searchPage.$searchButton).toBeDisabled()
    })
  })

  test('should show error for search term with 2 characters', async ({ searchPage }) => {
    await test.step('Enter 2 characters', async () => {
      await searchPage.fillSearchInput(INVALID_SEARCH_TERMS.tooShort[1])
    })

    await test.step('Try to submit', async () => {
      await searchPage.submitSearch()
    })

    await test.step('Verify error message appears', async () => {
      await expect(searchPage.getErrorMessage('minLength')).toBeVisible()
    })
  })

  test('should reject search with only whitespace', async ({ searchPage }) => {
    await test.step('Enter only spaces', async () => {
      await searchPage.fillSearchInput(INVALID_SEARCH_TERMS.onlyWhitespace[0])
    })

    await test.step('Try to submit', async () => {
      await searchPage.submitSearch()
    })

    await test.step('Verify error message appears', async () => {
      await expect(searchPage.getErrorMessage('onlyWhitespace')).toBeVisible()
    })

    await test.step('Verify submit button is disabled', async () => {
      await expect(searchPage.$searchButton).toBeDisabled()
    })
  })

  test('should reject search exceeding 100 characters', async ({ searchPage }) => {
    await test.step('Enter 101 characters', async () => {
      await searchPage.fillSearchInput(INVALID_SEARCH_TERMS.tooLong)
    })

    await test.step('Try to submit', async () => {
      await searchPage.submitSearch()
    })

    await test.step('Verify error message appears', async () => {
      await expect(searchPage.getErrorMessage('maxLength')).toBeVisible()
    })

    await test.step('Verify submit button is disabled', async () => {
      await expect(searchPage.$searchButton).toBeDisabled()
    })
  })

  test('should reject XSS attempt with <script> tag', async ({ searchPage }) => {
    await test.step('Enter malicious script', async () => {
      await searchPage.fillSearchInput(INVALID_SEARCH_TERMS.xss[0])
    })

    await test.step('Try to submit', async () => {
      await searchPage.submitSearch()
    })

    await test.step('Verify security error appears', async () => {
      await expect(searchPage.getErrorMessage('invalidCharacters')).toBeVisible()
    })

    await test.step('Verify submit button is disabled', async () => {
      await expect(searchPage.$searchButton).toBeDisabled()
    })
  })

  test('should enable submit button only with valid input', async ({ searchPage }) => {
    await test.step('Verify button disabled initially', async () => {
      await expect(searchPage.$searchButton).toBeDisabled()
    })

    await test.step('Enter valid search term', async () => {
      await searchPage.fillSearchInput(EDGE_CASE_SEARCHES.withSpaces.trim())
    })

    await test.step('Verify button becomes enabled', async () => {
      await expect(searchPage.$searchButton).toBeEnabled()
    })

    await test.step('Clear input', async () => {
      await searchPage.clearInput()
    })

    await test.step('Verify button disabled again', async () => {
      await expect(searchPage.$searchButton).toBeDisabled()
    })
  })

  test('should trim whitespace from search term', async ({ searchPage }) => {
    await test.step('Enter search with leading/trailing spaces', async () => {
      await searchPage.fillSearchInput(EDGE_CASE_SEARCHES.withSpaces)
    })

    await test.step('Submit search', async () => {
      await searchPage.search(EDGE_CASE_SEARCHES.withSpaces)
    })

    await test.step('Verify trimmed value in input', async () => {
      await expect(searchPage.$searchInput).toHaveValue(EDGE_CASE_SEARCHES.withSpaces.trim())
    })
  })
})
