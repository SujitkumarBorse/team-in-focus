# End-to-End Testing with Playwright

This directory contains comprehensive End-to-End (E2E) tests for the Team In Focus Angular application using Playwright.

## Test Structure

### Test Files

1. **`navigation.spec.ts`** - Tests all navigation flows and routing
2. **`contact-form.spec.ts`** - Tests contact form functionality and validation
3. **`gallery.spec.ts`** - Tests gallery page interactions and image handling
4. **`responsive.spec.ts`** - Tests responsive design across different viewports
5. **`accessibility.spec.ts`** - Tests accessibility compliance and keyboard navigation

### Test Categories

#### Navigation Tests
- Page routing and URL navigation
- Navigation menu functionality
- Direct URL access
- Back navigation

#### Contact Form Tests
- Form field validation
- Data input and submission
- Special character handling
- Keyboard navigation
- Form accessibility

#### Gallery Tests
- Image loading and display
- Image interactions
- Filtering and search (if implemented)
- Pagination (if implemented)
- Responsive image handling

#### Responsive Design Tests
- Cross-viewport compatibility
- Mobile navigation
- Touch interactions
- Orientation handling
- Performance across devices

#### Accessibility Tests
- WCAG compliance checks
- Keyboard navigation
- Screen reader compatibility
- ARIA attributes
- Color contrast (basic)
- Focus management

## Running Tests

### Prerequisites
- Node.js and npm installed
- Angular application running on `http://localhost:4200`

### Available Commands

```bash
# Run all E2E tests
npm run e2e

# Run tests with UI mode (interactive)
npm run e2e:ui

# Run tests in headed mode (visible browser)
npm run e2e:headed

# Run tests in debug mode
npm run e2e:debug

# Show test report
npm run e2e:report
```

### Running Specific Tests

```bash
# Run only navigation tests
npx playwright test navigation.spec.ts

# Run only accessibility tests
npx playwright test accessibility.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium

# Run tests on mobile viewport
npx playwright test --project="Mobile Chrome"
```

## Test Configuration

The tests are configured in `playwright.config.ts` with the following features:

- **Multiple browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Responsive testing**: Various viewport sizes
- **Auto-start server**: Automatically starts the Angular dev server
- **Screenshots**: Captures screenshots on test failures
- **Video recording**: Records videos for failed tests
- **Trace collection**: Collects traces for debugging

## Test Data

The tests use realistic test data including:
- Valid email addresses
- Phone numbers with proper formatting
- Special characters in form fields
- Long text content
- Various viewport sizes

## Best Practices

### Writing Tests
1. Use descriptive test names
2. Group related tests in `test.describe()` blocks
3. Use `test.beforeEach()` for common setup
4. Test both positive and negative scenarios
5. Include accessibility checks

### Test Maintenance
1. Keep tests independent
2. Use proper selectors (prefer data attributes)
3. Handle dynamic content appropriately
4. Add appropriate waits for async operations
5. Clean up test data when necessary

## Debugging Tests

### Using Debug Mode
```bash
npm run e2e:debug
```

### Using UI Mode
```bash
npm run e2e:ui
```

### Viewing Reports
```bash
npm run e2e:report
```

### Common Issues

1. **Element not found**: Check if selectors are correct
2. **Timing issues**: Add appropriate waits
3. **Viewport issues**: Ensure responsive design is working
4. **Accessibility issues**: Verify ARIA attributes and keyboard navigation

## Continuous Integration

The tests are configured for CI environments:
- Retries on failure (2 retries in CI)
- Parallel execution
- Fail fast on CI
- Proper timeout handling

## Browser Support

Tests run on:
- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: Chrome (Pixel 5), Safari (iPhone 12)
- **Viewports**: 320px to 1920px width

## Performance Considerations

- Tests include performance measurements
- Load time expectations (5-10 seconds max)
- Network idle waiting
- Efficient selectors

## Accessibility Standards

Tests verify:
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- Focus management
- Color contrast (basic)
- Semantic HTML structure

## Reporting

Test results include:
- HTML reports with screenshots
- Video recordings of failures
- Trace files for debugging
- Console output with detailed logs
- Performance metrics

## Future Enhancements

Potential improvements:
- Visual regression testing
- API testing integration
- Custom test data factories
- Performance benchmarking
- Cross-browser visual testing
- Mobile device testing 