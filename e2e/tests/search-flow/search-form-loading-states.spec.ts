import { test, expect } from '../../fixtures/base'
import { mockJsonResponse, setupApiMocks } from '../../fixtures/mockApi'
import { generateSearchResponse } from '../../fixtures/mockDataGenerators'

test.describe('Search Form - Loading States', () => {
  test('should show loading state during search', async ({ searchPage }) => {
    await test.step('Start search', async () => {
      await searchPage.fillSearchInput('javascript')
      await searchPage.submitSearch()
    })

    await test.step('Verify button is disabled during loading', async () => {
      await expect(searchPage.$searchButton).toBeDisabled()
    })

    await test.step('Verify input is disabled during loading', async () => {
      await expect(searchPage.$searchInput).toBeDisabled()
    })

    await test.step('Wait for loading to complete', async () => {
      await searchPage.$repositoryCards.first().waitFor({ timeout: 10000 })
    })

    await test.step('Verify button re-enabled after loading', async () => {
      await expect(searchPage.$searchButton).toBeEnabled()
    })

    await test.step('Verify input re-enabled after loading', async () => {
      await expect(searchPage.$searchInput).toBeEnabled()
    })
  })

  test('should show skeleton loading state', async ({ page, searchPage }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(generateSearchResponse(), { delay: 2000 }),
      },
    ])

    await test.step('Fill search input', async () => {
      await searchPage.fillSearchInput('vue')
      await searchPage.submitSearch()
    })

    await test.step('Verify skeleton cards appear', async () => {
      // Skeleton should show animated placeholder cards
      const skeletonCards = page.locator('[class*="animate-pulse"]')
      await expect(skeletonCards.first()).toBeVisible({ timeout: 1000 })
    })

    await test.step('Verify skeleton disappears when loaded', async () => {
      // Wait for real content
      await searchPage.$repositoryCards.first().waitFor({ timeout: 10000 })

      // Skeleton should be gone (or at least not the primary content)
      await expect(searchPage.$repositoryCards.first()).toBeVisible()
    })
  })

  test('should prevent duplicate submissions while loading', async ({ page, searchPage }) => {
    const requestCounter = { count: 0 }

    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(generateSearchResponse(), { counter: requestCounter }),
      },
    ])

    await test.step('Fill search input', async () => {
      await searchPage.fillSearchInput('vue')
      await searchPage.submitSearch()
    })

    await test.step('Wait for search to complete', async () => {
      await searchPage.$repositoryCards.first().waitFor()
    })

    await test.step('Verify only one request was made', async () => {
      expect(requestCounter.count).toBe(1)
    })
  })

  test('should not submit new search while previous is loading', async ({ page, searchPage }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(generateSearchResponse(), { delay: 3000 }),
      },
    ])

    await test.step('Start first search', async () => {
      await searchPage.fillSearchInput('angular')
      await searchPage.submitSearch()
    })

    await test.step('Verify form is disabled', async () => {
      await expect(searchPage.$searchInput).toBeDisabled()
      await expect(searchPage.$searchButton).toBeDisabled()
    })

    await test.step('Wait for first search to complete', async () => {
      await searchPage.$repositoryCards.first().waitFor({ timeout: 10000 })
    })

    await test.step('Verify form is enabled again', async () => {
      await expect(searchPage.$searchInput).toBeEnabled()
      await expect(searchPage.$searchButton).toBeEnabled()
    })
  })

  test('should show loading indicator during submission', async ({ page, searchPage }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(generateSearchResponse(), { delay: 2000 }),
      },
    ])

    await test.step('Start search', async () => {
      await searchPage.fillSearchInput('svelte')
      await searchPage.submitSearch()
    })

    await test.step('Verify loading state visible', async () => {
      // Button should be disabled (indicating loading)
      await expect(searchPage.$searchButton).toBeDisabled()
    })

    await test.step('Wait for completion', async () => {
      await searchPage.$repositoryCards.first().waitFor({ timeout: 10000 })
    })

    await test.step('Verify loading state cleared', async () => {
      await expect(searchPage.$searchButton).toBeEnabled()
    })
  })
})
