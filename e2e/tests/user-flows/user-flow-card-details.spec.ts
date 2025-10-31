import { VALID_SEARCH_TERMS } from '../../fixtures/constants'
import { test, expect } from '../../fixtures/base'
import { mockJsonResponse, setupApiMocks } from '../../fixtures/mockApi'
import { generateSearchResponse } from '../../fixtures/mockDataGenerators'

test.describe('Repository Card Click - Details Page', () => {
  test.beforeEach(async ({ page }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(generateSearchResponse()),
      },
    ])
  })

  test('should navigate to details page when card is clicked', async ({ searchPage, detailsPage }) => {
    await searchPage.search(VALID_SEARCH_TERMS[0])

    // Click the first repository card
    await searchPage.$repositoryCards.first().click()

    // Details page should show repository info
    await expect(detailsPage.$heading).toBeVisible()
    await expect(detailsPage.$description).toBeVisible()
    await expect(detailsPage.$ownerLabel).toBeVisible()
    await expect(detailsPage.$repositoryLabel).toBeVisible()
    await expect(detailsPage.$backLink).toBeVisible()
  })

  test('should go back to search results when clicking back', async ({ searchPage, detailsPage }) => {
    await searchPage.search()
    await searchPage.$repositoryCards.first().click()
    await detailsPage.goBack()
    await expect(searchPage.$repositoryCards.first()).toBeVisible()
  })
})
