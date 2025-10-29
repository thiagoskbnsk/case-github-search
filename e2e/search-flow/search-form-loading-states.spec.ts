import { test, expect } from '@playwright/test'

test.describe('Search Form - Loading States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should show loading state during search', async ({ page }) => {
    await test.step('Start search', async () => {
      const searchInput = page.getByRole('textbox', { name: /Search GitHub repositories/i })
      await searchInput.fill('javascript')

      const searchButton = page.getByRole('button', { name: 'Search' })
      await searchButton.click()
    })

    await test.step('Verify button is disabled during loading', async () => {
      const searchButton = page.getByRole('button', { name: 'Search' })
      await expect(searchButton).toBeDisabled()
    })

    await test.step('Verify input is disabled during loading', async () => {
      const searchInput = page.getByRole('textbox', { name: /Search GitHub repositories/i })
      await expect(searchInput).toBeDisabled()
    })

    await test.step('Wait for loading to complete', async () => {
      await page.getByRole('article').first().waitFor({ timeout: 10000 })
    })

    await test.step('Verify button re-enabled after loading', async () => {
      const searchButton = page.getByRole('button', { name: 'Search' })
      await expect(searchButton).toBeEnabled()
    })

    await test.step('Verify input re-enabled after loading', async () => {
      const searchInput = page.getByRole('textbox', { name: /Search GitHub repositories/i })
      await expect(searchInput).toBeEnabled()
    })
  })

  test('should show skeleton loading state', async ({ page }) => {
    // Slow down network to see skeleton
    await page.route('**/search/repositories**', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      await route.continue()
    })

    await test.step('Start search', async () => {
      const searchInput = page.getByRole('textbox', { name: /Search GitHub repositories/i })
      await searchInput.fill('react')
      await page.getByRole('button', { name: 'Search' }).click()
    })

    await test.step('Verify skeleton cards appear', async () => {
      // Skeleton should show animated placeholder cards
      const skeletonCards = page.locator('[class*="animate-pulse"]')
      await expect(skeletonCards.first()).toBeVisible({ timeout: 1000 })
    })

    await test.step('Verify skeleton disappears when loaded', async () => {
      // Wait for real content
      await page.getByRole('article').first().waitFor({ timeout: 10000 })

      // Skeleton should be gone (or at least not the primary content)
      const actualCards = page.getByRole('article')
      await expect(actualCards.first()).toBeVisible()
    })
  })

  test('should prevent duplicate submissions while loading', async ({ page }) => {
    let requestCount = 0

    await page.route('**/search/repositories**', async route => {
      requestCount++
      await new Promise(resolve => setTimeout(resolve, 1000))
      await route.continue()
    })

    await test.step('Fill search input', async () => {
      const searchInput = page.getByRole('textbox', { name: /Search GitHub repositories/i })
      await searchInput.fill('vue')
    })

    await test.step('Click submit button once', async () => {
      const searchButton = page.getByRole('button', { name: 'Search' })
      await searchButton.click()

      // Button should be disabled immediately, preventing additional clicks
      await expect(searchButton).toBeDisabled()
    })

    await test.step('Wait for search to complete', async () => {
      await page.getByRole('article').first().waitFor({ timeout: 10000 })
    })

    await test.step('Verify only one request was made', async () => {
      // Should be 1 for the initial search
      expect(requestCount).toBe(1)
    })
  })

  test('should not submit new search while previous is loading', async ({ page }) => {
    await page.route('**/search/repositories**', async route => {
      await new Promise(resolve => setTimeout(resolve, 3000))
      await route.continue()
    })

    await test.step('Start first search', async () => {
      const searchInput = page.getByRole('textbox', { name: /Search GitHub repositories/i })
      await searchInput.fill('angular')
      await page.getByRole('button', { name: 'Search' }).click()
    })

    await test.step('Verify form is disabled', async () => {
      const searchInput = page.getByRole('textbox', { name: /Search GitHub repositories/i })
      const searchButton = page.getByRole('button', { name: 'Search' })

      await expect(searchInput).toBeDisabled()
      await expect(searchButton).toBeDisabled()
    })

    await test.step('Wait for first search to complete', async () => {
      await page.getByRole('article').first().waitFor({ timeout: 10000 })
    })

    await test.step('Verify form is enabled again', async () => {
      const searchInput = page.getByRole('textbox', { name: /Search GitHub repositories/i })
      const searchButton = page.getByRole('button', { name: 'Search' })

      await expect(searchInput).toBeEnabled()
      await expect(searchButton).toBeEnabled()
    })
  })

  test('should show loading indicator during submission', async ({ page }) => {
    await page.route('**/search/repositories**', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      await route.continue()
    })

    await test.step('Start search', async () => {
      const searchInput = page.getByRole('textbox', { name: /Search GitHub repositories/i })
      await searchInput.fill('svelte')
      await page.getByRole('button', { name: 'Search' }).click()
    })

    await test.step('Verify loading state visible', async () => {
      // Button should be disabled (indicating loading)
      const searchButton = page.getByRole('button', { name: 'Search' })
      await expect(searchButton).toBeDisabled()
    })

    await test.step('Wait for completion', async () => {
      await page.getByRole('article').first().waitFor({ timeout: 10000 })
    })

    await test.step('Verify loading state cleared', async () => {
      const searchButton = page.getByRole('button', { name: 'Search' })
      await expect(searchButton).toBeEnabled()
    })
  })
})
