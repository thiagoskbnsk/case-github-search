import { test, expect } from '../../fixtures/base'
import { mockJsonResponse, setupApiMocks } from '../../fixtures/mockApi'
import { generateSearchResponse } from '../../fixtures/mockDataGenerators'
import { VALID_SEARCH_TERMS } from '../../fixtures/constants'

test.describe('Search API - Error Handling', () => {
  test('should handle 403 rate limit error', async ({ page, searchPage }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(
          {
            message: 'API rate limit exceeded',
            documentation_url: 'https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting',
          },
          { status: 403 }
        ),
      },
    ])

    await test.step('Perform search', async () => {
      await searchPage.fillSearchInput(VALID_SEARCH_TERMS[0])
      await searchPage.submitSearch()
    })

    await test.step('Verify error message displayed', async () => {
      await expect(searchPage.page.getByText(/something went wrong/i)).toBeVisible()
    })
  })

  test('should handle 422 validation error', async ({ page, searchPage }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(
          {
            message: 'Validation Failed',
            errors: [
              {
                resource: 'Search',
                field: 'q',
                code: 'invalid',
              },
            ],
          },
          { status: 422 }
        ),
      },
    ])

    await test.step('Perform search', async () => {
      await searchPage.fillSearchInput(VALID_SEARCH_TERMS[0])
      await searchPage.submitSearch()
    })

    await test.step('Verify error message displayed', async () => {
      await expect(searchPage.page.getByText(/something went wrong/i)).toBeVisible()
    })
  })

  test('should handle 503 service unavailable', async ({ page, searchPage }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(
          {
            message: 'Service Unavailable',
          },
          { status: 503 }
        ),
      },
    ])

    await test.step('Perform search', async () => {
      await searchPage.fillSearchInput(VALID_SEARCH_TERMS[0])
      await searchPage.submitSearch()
    })

    await test.step('Verify error message displayed', async () => {
      await expect(searchPage.page.getByText(/something went wrong/i)).toBeVisible()
    })
  })

  test('should handle network timeout', async ({ page, searchPage }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(generateSearchResponse(), { delay: 15000 }), // 15s delay to trigger timeout
      },
    ])

    await test.step('Perform search', async () => {
      await searchPage.fillSearchInput(VALID_SEARCH_TERMS[0])
      await searchPage.submitSearch()
    })

    await test.step('Verify timeout error handling', async () => {
      // Should show error or timeout message
      await expect(searchPage.page.getByText(/something went wrong/i)).toBeVisible({ timeout: 20000 })
    })
  })

  test('should handle empty results gracefully', async ({ page, searchPage }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse({
          total_count: 0,
          incomplete_results: false,
          items: [],
        }),
      },
    ])

    await test.step('Perform search', async () => {
      await searchPage.fillSearchInput('qwertynonexistent12345')
      await searchPage.submitSearch()
    })

    await test.step('Wait for response', async () => {
      await searchPage.page.waitForTimeout(1000)
    })

    await test.step('Verify empty state message', async () => {
      await expect(searchPage.page.getByText(/no results|no repositories found/i)).toBeVisible()
    })

    await test.step('Verify no repository cards displayed', async () => {
      await expect(searchPage.repositoryCards).toHaveCount(0)
    })
  })

  test('should handle malformed API response', async ({ page, searchPage }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: async route => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: 'invalid json {{{',
          })
        },
      },
    ])

    await test.step('Perform search', async () => {
      await searchPage.fillSearchInput(VALID_SEARCH_TERMS[0])
      await searchPage.submitSearch()
    })

    await test.step('Verify error handling', async () => {
      await expect(searchPage.page.getByText(/something went wrong/i)).toBeVisible()
    })
  })
})
