import { REPOSITORY_IDS, VALID_SEARCH_TERMS } from '../fixtures/search-test-data'
import { test, expect } from '../fixtures/test-fixtures'

test.describe('Repository Details Page', () => {
  test('should show all repository info for valid repo', async ({ searchPage, detailsPage }) => {
    // First, perform a search to populate the context
    await searchPage.search(VALID_SEARCH_TERMS[0])

    // Click on the first repository card to navigate to details
    await searchPage.repositoryCards.first().click()

    // Verify details page shows all repository info
    await expect(detailsPage.heading).toBeVisible()
    await expect(detailsPage.description).toBeVisible()
    await expect(detailsPage.ownerLabel).toBeVisible()
    await expect(detailsPage.starsLabel).toBeVisible()
    await expect(detailsPage.forksLabel).toBeVisible()
  })

  for (const invalidId of REPOSITORY_IDS.invalid) {
    test(`should show 404 for invalid repo id: ${invalidId}`, async ({ notFoundPage }) => {
      await notFoundPage.gotoInvalidRepository(invalidId)
      await expect(notFoundPage.repoNotFoundMessage).toBeVisible()
      await expect(notFoundPage.goBackHomeLink).toBeVisible()
    })
  }
})
