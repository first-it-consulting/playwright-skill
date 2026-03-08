const fs = require('fs');

const PLAYWRIGHT_SERVER = process.env.PLAYWRIGHT_SERVER || 'http://playwright.first-it-consulting.com:30150';

async function takeScreenshot(url, outputPath, options = {}) {
  const {
    fullPage = false,
    viewport = { width: 1280, height: 720 },
    waitForSelector = null,
    delay = 0,
    format = 'png'
  } = options;

  const response = await fetch(`${PLAYWRIGHT_SERVER}/screenshot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url,
      fullPage,
      viewport,
      waitForSelector,
      delay,
      format
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Screenshot failed: ${error}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  console.log(`Screenshot saved: ${outputPath}`);
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const url = args[0];
  const outputPath = args[1] || 'screenshot.png';
  
  if (!url) {
    console.log('Usage: node screenshot.js <url> [output-path] [options]');
    console.log('Options: --full-page, --browser=chromium|firefox|webkit, --wait-for=selector, --delay=ms');
    process.exit(1);
  }
  
  const options = {
    fullPage: args.includes('--full-page'),
    browserType: args.find(a => a.startsWith('--browser='))?.split('=')[1] || 'chromium',
    waitForSelector: args.find(a => a.startsWith('--wait-for='))?.split('=')[1],
    delay: parseInt(args.find(a => a.startsWith('--delay='))?.split('=')[1] || '0')
  };
  
  takeScreenshot(url, outputPath, options).catch(console.error);
}

module.exports = { takeScreenshot };
