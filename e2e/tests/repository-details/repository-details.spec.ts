import { mockJsonResponse, setupApiMocks } from '../../fixtures/mockApi'
import { generateSearchResponse } from '../../fixtures/mockDataGenerators'
import { REPOSITORY_IDS, VALID_SEARCH_TERMS } from '../../fixtures/constants'
import { test, expect } from '../../fixtures/base'

test.describe('Repository Details Page', () => {
  test.beforeEach(async ({ page }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(generateSearchResponse()),
      },
    ])
  })

  test('should show all repository info for valid repo', async ({ detailsPage, searchPage }) => {
    await test.step('Search repos', async () => {
      await searchPage.search(VALID_SEARCH_TERMS[0])
    })

    await test.step('Navigate to details page', async () => {
      await searchPage.$repositoryCards.first().click()
    })

    await test.step('verify data on details page', async () => {
      await expect(detailsPage.$heading).toBeVisible()
      await expect(detailsPage.$description).toBeVisible()
      await expect(detailsPage.$ownerLabel).toBeVisible()
      await expect(detailsPage.$starsLabel).toBeVisible()
      await expect(detailsPage.$forksLabel).toBeVisible()
    })
  })

  for (const invalidId of REPOSITORY_IDS.invalid) {
    test(`should show 404 for invalid repo id: ${invalidId}`, async ({ notFoundPage }) => {
      await notFoundPage.gotoInvalidRepository(invalidId)
      await expect(notFoundPage.$pageNotFoundMessage).toBeVisible()
      await expect(notFoundPage.$goBackHomeLink).toBeVisible()
    })
  }
})
