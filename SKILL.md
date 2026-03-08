---
name: playwright
description: "Browser automation via remote Playwright WebSocket server. Use for taking screenshots, generating PDFs, and running remote browser tests without local browser installation."
homepage: https://github.com/first-it-consulting/playwright-skill
metadata:
  {"openclaw":{"emoji":"🎭","homepage":"https://github.com/first-it-consulting/playwright-skill","requires":{"bins":["node"],"env":["PLAYWRIGHT_WS"]},"primaryEnv":"PLAYWRIGHT_WS"}}
---

# Playwright

Remote browser automation via WebSocket server. No local browsers needed.

## Quick Start

```bash
export PLAYWRIGHT_WS=ws://your-server:3000
node scripts/screenshot.js https://example.com screenshot.png --full-page
node scripts/pdf-export.js https://example.com page.pdf
```

## References

- [Selector Strategies](references/selectors.md)
- [API Reference](references/api-reference.md)