# Playwright Skill for OpenClaw

Browser automation skill using a remote Playwright server. No local browser installation needed.

## Server

- **URL**: http://playwright.first-it-consulting.com:30150
- **Purpose**: Remote browser automation, screenshots, PDF generation

## Quick Start

```bash
# Clone this skill
git clone <repo-url>

# Use scripts directly
node scripts/screenshot.js https://example.com output.png
node scripts/pdf-export.js https://example.com output.pdf
```

## Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `screenshot.js` | Take screenshots via Playwright server | `node screenshot.js <url> [output] [options]` |
| `pdf-export.js` | Generate PDFs via Playwright server | `node pdf-export.js <url> [output] [options]` |
| `test-runner.js` | Run Playwright tests | `node test-runner.js [options]` |

## API Client

Use the server API directly:

```javascript
const response = await fetch('http://playwright.first-it-consulting.com:30150/screenshot', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://example.com', fullPage: true })
});
const buffer = await response.arrayBuffer();
```

## References

- `references/selectors.md` - Playwright selector strategies
- `references/api-reference.md` - Full API documentation

## License

MIT
