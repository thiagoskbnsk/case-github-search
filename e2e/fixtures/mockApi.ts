import type { Page, Route } from '@playwright/test'

export type ApiMockHandler = (route: Route) => Promise<void>

export interface ApiMockConfig {
  pattern: string | RegExp
  handler: ApiMockHandler
}

/**
 * Setup API mocks and abort unnecessary downloads.
 *
 * @param page - Playwright page instance
 * @param mocks - Optional array of API mocks to apply
 *
 * @example
 * await setupApiMocks(page, [
 *   {
 *     pattern: '/search/repositories',
 *     handler: mockJsonResponse({ items: [...] })
 *   }
 * ])
 */
export async function setupApiMocks(page: Page, mocks: ApiMockConfig[] = []) {
  await page.route('**/*', async (route: Route) => {
    const url = route.request().url()

    // Apply custom mocks
    for (const mock of mocks) {
      const matches = typeof mock.pattern === 'string' ? url.includes(mock.pattern) : mock.pattern.test(url)

      if (matches) {
        await mock.handler(route)
        return
      }
    }

    // Allow other requests (real API calls)
    await route.continue()
  })
}

/**
 * Helper to create a JSON response mock handler
 */
export function mockJsonResponse(
  data: unknown,
  options: {
    status?: number
    delay?: number
    counter?: { count: number }
  } = {}
): ApiMockHandler {
  const { status = 200, delay = 0, counter } = options

  return async (route: Route) => {
    if (counter) {
      counter.count++
    }

    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(data),
    })
  }
}

/**
 * Helper to create a paginated response handler
 * Dynamically generates responses based on page query parameter
 */
export function mockPaginatedResponse(
  generator: (page: number) => unknown,
  options: {
    status?: number
    delay?: number
  } = {}
): ApiMockHandler {
  const { status = 200, delay = 0 } = options

  return async (route: Route) => {
    const url = new URL(route.request().url())
    const pageParam = url.searchParams.get('page')
    const page = pageParam ? parseInt(pageParam, 10) : 1

    const data = generator(page)

    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(data),
    })
  }
}

/**
 * Helper to wait for an API response
 */
export async function waitForApiResponse(page: Page, pattern: string | RegExp) {
  return page.waitForResponse(resp => {
    const url = resp.url()
    const matches = typeof pattern === 'string' ? url.includes(pattern) : pattern.test(url)
    return matches && resp.status() === 200
  })
}
