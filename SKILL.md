---
name: playwright
description: "Browser automation via Playwright WebSocket server. Use when (1) Remote browser automation through Playwright WebSocket server, (2) Taking screenshots or generating PDFs via remote browser, (3) Running browser tasks without local browser installation, (4) Distributed browser automation across network. Set PLAYWRIGHT_WS environment variable to WebSocket URL."
---

# Playwright

## Overview

This skill provides browser automation via a **remote Playwright WebSocket server**. No local browser installation required — all browser tasks are executed on the remote server.

**Configuration:** Set the `PLAYWRIGHT_WS` environment variable to your Playwright WebSocket URL:
```bash
export PLAYWRIGHT_WS=ws://your-playwright-server:3000
```

For local Playwright usage (if server unavailable), standard Playwright installation applies.

## Installation

```bash
# Install Playwright and browsers
npm install -g @playwright/test
npx playwright install

# Or install locally in a project
npm init -y
npm install @playwright/test
npx playwright install
```

## Quick Start

### Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (visible browser)
npx playwright test --headed

# Run specific test file
npx playwright test example.spec.js

# Run with specific browser
npx playwright test --project=chromium
```

### Code Generation

```bash
# Record user interactions and generate test code
npx playwright codegen https://example.com

# Record with specific browser
npx playwright codegen --browser=firefox https://example.com
```

### Debugging

```bash
# Run in debug mode with inspector
npx playwright test --debug

# Show trace viewer for failed tests
npx playwright show-trace trace.zip
```

## Common Tasks

### Taking Screenshots

```bash
# Screenshot of a URL
npx playwright screenshot https://example.com example.png

# Full page screenshot
npx playwright screenshot --full-page https://example.com example.png

# Screenshot with specific viewport
npx playwright screenshot --viewport-size=1280,720 https://example.com example.png
```

### Generating PDFs

```bash
# PDF from URL
npx playwright pdf https://example.com example.pdf

# PDF with specific format
npx playwright pdf --format=A4 https://example.com example.pdf
```

### Browser Automation Script

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  // Interact with page...
  await browser.close();
})();
```

## Test Structure

### Basic Test Example

```javascript
const { test, expect } = require('@playwright/test');

test('basic navigation', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

### Configuration (playwright.config.js)

```javascript
module.exports = {
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
};
```

## Useful Scripts

This skill includes helper scripts in `scripts/`:

- `screenshot.js` - Take screenshots programmatically with options
- `pdf-export.js` - Generate PDFs from URLs with custom settings
- `test-runner.js` - Wrapper for running tests with custom options

## Resources

### references/
- `selectors.md` - Playwright selector strategies and best practices
- `api-reference.md` - Common API patterns and examples

### scripts/
- `screenshot.js` - Screenshot automation script
- `pdf-export.js` - PDF generation script
