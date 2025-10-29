import { test, expect } from '../fixtures/test-fixtures'

test.describe('404 Page', () => {
  test('should show 404 page for unknown route', async ({ notFoundPage }) => {
    await notFoundPage.gotoUnknownRoute()
    await expect(notFoundPage.pageNotFoundMessage).toBeVisible()
    await expect(notFoundPage.goBackHomeLink).toBeVisible()
  })
})
