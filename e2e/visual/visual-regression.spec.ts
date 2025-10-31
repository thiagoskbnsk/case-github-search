import { test, expect } from '../fixtures/base'
import { mockJsonResponse, setupApiMocks } from '../fixtures/mockApi'
import { generateSearchResponse, generateRepository } from '../fixtures/mockDataGenerators'
import { VALID_SEARCH_TERMS } from '../fixtures/constants'

test.describe('Visual Regression Tests', () => {
  test('should match snapshot for empty search results', async ({ page, searchPage }) => {
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

    await test.step('Perform search with no results', async () => {
      await searchPage.fillSearchInput('qwertynonexistent12345')
      await searchPage.submitSearch()
    })

    await test.step('Wait for empty state to render', async () => {
      await expect(searchPage.page.getByText(/no results|no repositories found/i)).toBeVisible({ timeout: 5000 })
    })

    await test.step('Take screenshot of empty state', async () => {
      await expect(page).toHaveScreenshot('empty-results.png', {
        fullPage: true,
        animations: 'disabled',
      })
    })
  })

  test('should match snapshot for search results with repositories', async ({ page, searchPage }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(
          generateSearchResponse({
            itemCount: 10,
            repositories: [
              {
                name: 'react',
                description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
                language: 'JavaScript',
                stargazers_count: 215000,
                forks_count: 45000,
                owner: {
                  login: 'facebook',
                  avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
                },
              },
              {
                name: 'vue',
                description: 'Vue.js is a progressive, incrementally-adoptable JavaScript framework.',
                language: 'TypeScript',
                stargazers_count: 205000,
                forks_count: 33000,
                owner: {
                  login: 'vuejs',
                  avatar_url: 'https://avatars.githubusercontent.com/u/6128107?v=4',
                },
              },
              {
                name: 'angular',
                description: 'The modern web developer platform',
                language: 'TypeScript',
                stargazers_count: 92000,
                forks_count: 24000,
                owner: {
                  login: 'angular',
                  avatar_url: 'https://avatars.githubusercontent.com/u/139426?v=4',
                },
              },
            ],
          })
        ),
      },
    ])

    await test.step('Perform search', async () => {
      await searchPage.search(VALID_SEARCH_TERMS[0])
    })

    await test.step('Wait for results to load', async () => {
      await expect(searchPage.$repositoryCards.first()).toBeVisible({ timeout: 5000 })
    })

    await test.step('Take screenshot of results page', async () => {
      await expect(page).toHaveScreenshot('search-results.png', {
        fullPage: true,
        animations: 'disabled',
      })
    })
  })

  test('should match snapshot for repository details page', async ({ page, searchPage, detailsPage }) => {
    const testRepo = generateRepository({
      id: 123456,
      name: 'awesome-project',
      description: 'An incredible open-source project that does amazing things with modern technology.',
      language: 'TypeScript',
      stargazers_count: 15000,
      forks_count: 3500,
      open_issues_count: 145,
      owner: {
        login: 'awesome-dev',
        avatar_url: 'https://avatars.githubusercontent.com/u/123456?v=4',
      },
    })

    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(
          generateSearchResponse({
            itemCount: 1,
            repositories: [testRepo],
          })
        ),
      },
    ])

    await test.step('Search and navigate to details', async () => {
      await searchPage.search(VALID_SEARCH_TERMS[0])
      await searchPage.$repositoryCards.first().click()
    })

    await test.step('Wait for details page to load', async () => {
      await expect(detailsPage.$heading).toBeVisible({ timeout: 5000 })
    })

    await test.step('Take screenshot of details page', async () => {
      await expect(page).toHaveScreenshot('repository-details.png', {
        fullPage: true,
        animations: 'disabled',
      })
    })
  })

  test('should match snapshot for initial search page', async ({ page, searchPage }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(generateSearchResponse()),
      },
    ])

    await test.step('Wait for page to load', async () => {
      await expect(searchPage.$heading).toBeVisible()
      await expect(searchPage.$searchInput).toBeVisible()
    })

    await test.step('Take screenshot of initial state', async () => {
      await expect(page).toHaveScreenshot('initial-search-page.png', {
        fullPage: true,
        animations: 'disabled',
      })
    })
  })

  test('should match snapshot for loading state', async ({ page, searchPage }) => {
    await setupApiMocks(page, [
      {
        pattern: '/search/repositories',
        handler: mockJsonResponse(generateSearchResponse({ itemCount: 10 }), { delay: 5000 }),
      },
    ])

    await test.step('Trigger search', async () => {
      await searchPage.fillSearchInput(VALID_SEARCH_TERMS[0])
      await searchPage.submitSearch()
    })

    await test.step('Wait for loading state', async () => {
      await page.waitForTimeout(500) // Give time for loading state to appear
      await expect(searchPage.$searchButton).toBeDisabled()
    })

    await test.step('Take screenshot of loading state', async () => {
      await expect(page).toHaveScreenshot('loading-state.png', {
        fullPage: true,
        animations: 'disabled',
      })
    })
  })

  test('should match snapshot for error state', async ({ page, searchPage }) => {
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

    await test.step('Trigger error', async () => {
      await searchPage.fillSearchInput(VALID_SEARCH_TERMS[0])
      await searchPage.submitSearch()
    })

    await test.step('Wait for error message', async () => {
      await expect(page.getByText(/something went wrong/i)).toBeVisible({ timeout: 5000 })
    })

    await test.step('Take screenshot of error state', async () => {
      await expect(page).toHaveScreenshot('error-state.png', {
        fullPage: true,
        animations: 'disabled',
      })
    })
  })
})
