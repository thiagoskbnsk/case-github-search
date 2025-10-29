# E2E Testing Documentation

## Architecture

This E2E test suite uses the **Page Object Model (POM)** pattern with custom Playwright fixtures for better organization, maintainability, and reusability.

## Structure

```
e2e/
├── fixtures/
│   ├── pages/                    # Page Object classes
│   │   ├── SearchPage.ts         # Search form interactions
│   │   ├── DetailsPage.ts        # Repository details page
│   │   └── NotFoundPage.ts       # 404 page
│   ├── search-test-data.ts       # Centralized test data and constants
│   └── test-fixtures.ts          # Custom Playwright fixtures
├── search-flow/                  # Search form tests
├── user-flows/                   # User journey tests
├── repository-details/           # Details page specific tests
└── visual/                       # Visual regression tests
```

## Page Objects

### SearchPage

Encapsulates all search form interactions:

```typescript
import { test, expect } from '../fixtures/test-fixtures'

test('example', async ({ searchPage }) => {
  // searchPage fixture auto-navigates to home page
  await searchPage.fillSearchInput('react')
  await searchPage.submitSearch()
  await expect(searchPage.repositoryCards.first()).toBeVisible()
})
```

**Available methods:**

- `goto()` - Navigate to home page
- `search(term)` - Fill input, submit, and wait for results
- `fillSearchInput(term)` - Fill search input
- `submitSearch()` - Click search button
- `pressEnter()` - Press Enter key
- `clearInput()` - Clear search input
- `getErrorMessage(type)` - Get error message locator

**Available locators:**

- `searchInput` - Search input field
- `searchButton` - Search button
- `repositoryCards` - All repository cards
- `heading` - Page heading
- `description` - Page description

### DetailsPage

Encapsulates repository details page:

```typescript
test('example', async ({ detailsPage }) => {
  await detailsPage.goto('123456')
  await expect(detailsPage.heading).toBeVisible()
  await detailsPage.goBack()
})
```

**Available methods:**

- `goto(repoId)` - Navigate to repository details
- `goBack()` - Click back link

**Available locators:**

- `heading` - Page heading
- `description` - Page description
- `ownerLabel` - Owner label
- `repositoryLabel` - Repository label
- `starsLabel` - Stars label
- `forksLabel` - Forks label
- `backLink` - Back navigation link

### NotFoundPage

Encapsulates 404 page:

```typescript
test('example', async ({ notFoundPage }) => {
  await notFoundPage.gotoUnknownRoute()
  await expect(notFoundPage.pageNotFoundMessage).toBeVisible()
})
```

**Available methods:**

- `gotoUnknownRoute()` - Navigate to unknown route
- `gotoInvalidRepository(repoId)` - Navigate to invalid repository

**Available locators:**

- `pageNotFoundMessage` - "Page not found" message
- `goBackHomeLink` - "Go back home" link
- `repoNotFoundMessage` - "Repo not found" message

## Test Data & Constants

All test data is centralized in `fixtures/search-test-data.ts`:

```typescript
import { VALID_SEARCH_TERMS, INVALID_SEARCH_TERMS, ERROR_MESSAGES } from '../fixtures/search-test-data'

test('example', async ({ searchPage }) => {
  await searchPage.fillSearchInput(VALID_SEARCH_TERMS[0])
  await expect(searchPage.getErrorMessage('minLength')).toBeVisible()
})
```

**Available exports:**

- `VALID_SEARCH_TERMS` - Valid search queries
- `INVALID_SEARCH_TERMS` - Invalid queries (tooShort, onlyWhitespace, tooLong, xss)
- `EDGE_CASE_SEARCHES` - Edge case queries
- `SELECTORS` - UI element selectors
- `EXPECTED_TEXTS` - Expected text patterns
- `ERROR_MESSAGES` - Validation error messages
- `REPOSITORY_IDS` - Valid/invalid repo IDs
- `ROUTES` - Route helpers
- `TIMEOUTS` - Timeout constants
- `PAGINATION` - Pagination settings

## Custom Fixtures

Custom fixtures automatically set up page objects with proper navigation:

```typescript
// Old approach (manual setup)
test('old way', async ({ page }) => {
  await page.goto('/')
  const searchInput = page.getByRole('textbox', { name: /Search GitHub repositories/i })
  await searchInput.fill('react')
  // ... more boilerplate
})

// New approach (with fixtures)
test('new way', async ({ searchPage }) => {
  // Already on home page!
  await searchPage.search('react')
  // Clean and maintainable
})
```

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '../fixtures/test-fixtures'
import { VALID_SEARCH_TERMS } from '../fixtures/search-test-data'

test.describe('Feature Name', () => {
  test('should do something', async ({ searchPage }) => {
    await test.step('Step 1 description', async () => {
      await searchPage.search(VALID_SEARCH_TERMS[0])
    })

    await test.step('Step 2 description', async () => {
      await expect(searchPage.repositoryCards).toHaveCount(12)
    })
  })
})
```

### Using Multiple Page Objects

```typescript
test('navigate between pages', async ({ searchPage, detailsPage }) => {
  await searchPage.search()
  await searchPage.repositoryCards.first().click()

  await expect(detailsPage.heading).toBeVisible()
  await detailsPage.goBack()

  await expect(searchPage.repositoryCards.first()).toBeVisible()
})
```

### Accessing Raw Page Object

If you need direct page access:

```typescript
test('custom interaction', async ({ searchPage }) => {
  // Access the underlying Page object
  await searchPage.page.goto('/custom-route')
  await searchPage.page.evaluate(() => window.scrollTo(0, 100))
})
```

## Running Tests

```bash
# Run all tests
pnpm test:e2e

# Run specific test file
pnpm test:e2e search-form-validation

# Run in headed mode
pnpm test:e2e --headed

# Run in specific browser
pnpm test:e2e --project=chromium

# Debug mode
pnpm test:e2e --debug
```

## Benefits of This Architecture

✅ **DRY (Don't Repeat Yourself)** - Selectors and logic defined once
✅ **Type-Safe** - Full TypeScript support with IntelliSense
✅ **Maintainable** - Changes to UI require updates in one place
✅ **Readable** - Tests read like user stories
✅ **Reusable** - Page objects work across all tests
✅ **Auto-Setup** - Fixtures handle navigation automatically
✅ **Scalable** - Easy to add new pages and tests

## Best Practices

1. **Use page objects for all UI interactions** - Don't use raw selectors in tests
2. **Keep test data in fixtures** - Use constants instead of hardcoded values
3. **Use descriptive test names** - Clearly state what is being tested
4. **Use test.step()** - Break tests into logical steps for better reporting
5. **Avoid test interdependencies** - Each test should be independent
6. **Use appropriate waits** - Leverage Playwright's auto-waiting, add explicit waits when needed
7. **Access page object locators directly** - They're already defined and typed
