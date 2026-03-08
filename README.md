# 🎭 Playwright Skill for OpenClaw

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.40%2B-blue)](https://playwright.dev/)

> Remote browser automation for OpenClaw agents. No local browser installation required.

## ✨ Features

- 📸 **Screenshots** – Capture full-page or viewport screenshots via remote server
- 📄 **PDF Export** – Generate PDFs from any URL
- 🧪 **Test Runner** – Execute Playwright tests on remote infrastructure
- 🌐 **Multi-browser** – Chromium, Firefox, WebKit support
- 🔧 **Zero Install** – No local browsers needed

## 🚀 Quick Start

### 1. Configure Server URL

```bash
export PLAYWRIGHT_SERVER=http://your-playwright-server:3000
```

### 2. Take a Screenshot

```bash
node scripts/screenshot.js https://example.com screenshot.png
node scripts/screenshot.js https://example.com screenshot.png --full-page
node scripts/screenshot.js https://example.com screenshot.png --wait-for=".loaded" --delay=1000
```

### 3. Generate PDF

```bash
node scripts/pdf-export.js https://example.com page.pdf
node scripts/pdf-export.js https://example.com page.pdf --format=A4 --landscape
```

### 4. Run Tests

```bash
node scripts/test-runner.js
node scripts/test-runner.js --headed --project=chromium
```

## 📋 Requirements

- Node.js 18+
- Remote Playwright server running
- Environment variable `PLAYWRIGHT_SERVER` set

## 🔧 Installation

```bash
# Clone the skill
git clone https://github.com/first-it-consulting/playwright-skill.git
cd playwright-skill

# Install dependencies (for local fallback only)
npm install
```

## 📚 API Reference

### Screenshot Endpoint

```javascript
POST /screenshot
Content-Type: application/json

{
  "url": "https://example.com",
  "fullPage": false,
  "viewport": { "width": 1280, "height": 720 },
  "waitForSelector": null,
  "delay": 0,
  "format": "png"
}
```

### PDF Endpoint

```javascript
POST /pdf
Content-Type: application/json

{
  "url": "https://example.com",
  "format": "A4",
  "landscape": false,
  "margin": { "top": "1cm", "right": "1cm", "bottom": "1cm", "left": "1cm" },
  "printBackground": true
}
```

### WebSocket Endpoint

```
WS /ws
```

Used for test execution via `PW_TEST_CONNECT_WS_ENDPOINT`.

## 📖 Documentation

- [Selector Strategies](references/selectors.md) – CSS, text, role, test-id selectors
- [API Reference](references/api-reference.md) – Full Playwright API patterns

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/screenshot.test.js
```

## 🛠️ Server Setup

Your Playwright server should expose these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/screenshot` | POST | Capture screenshots |
| `/pdf` | POST | Generate PDFs |
| `/ws` | WS | Browser WebSocket for tests |

Example server implementation:

```javascript
const { chromium } = require('playwright');
const express = require('express');
const app = express();

app.post('/screenshot', async (req, res) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(req.body.url);
  const screenshot = await page.screenshot({ fullPage: req.body.fullPage });
  await browser.close();
  res.set('Content-Type', 'image/png');
  res.send(screenshot);
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## 📄 License

MIT © [First IT Consulting](https://github.com/first-it-consulting)

---

<p align="center">
  Made with ❤️ for OpenClaw
</p>
