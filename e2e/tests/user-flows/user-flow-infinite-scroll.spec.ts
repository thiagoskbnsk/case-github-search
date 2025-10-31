import { VALID_SEARCH_TERMS, EXPECTED_TEXTS, TIMEOUTS } from '../../fixtures/constants'
import { test, expect } from '../../fixtures/base'
import { mockPaginatedResponse, setupApiMocks } from '../../fixtures/mockApi'
import { generatePaginatedResponse } from '../../fixtures/mockDataGenerators'

test.describe('Search Results - Infinite Scroll', () => {
  test('should load more results when scrolling to bottom', async ({ page, searchPage }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockPaginatedResponse(generatePaginatedResponse),
      },
    ])

    await searchPage.search(VALID_SEARCH_TERMS[0])

    // Verify initial results are loaded
    await expect(searchPage.$repositoryCards.first()).toBeVisible()

    // Scroll to bottom multiple times to load all pages (max 3 pages)
    // We need to scroll more times because of virtualization
    for (let i = 0; i < 5; i++) {
      await searchPage.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await searchPage.page.waitForTimeout(TIMEOUTS.scrollWait + 500)
    }

    // Verify we reached the end - "No more results" message should appear
    await expect(searchPage.page.getByText(EXPECTED_TEXTS.noMoreResults)).toBeVisible({ timeout: 10000 })
  })
})
