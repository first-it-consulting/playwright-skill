const fs = require('fs');

const PLAYWRIGHT_SERVER = process.env.PLAYWRIGHT_SERVER || 'http://playwright.first-it-consulting.com:30150';

async function generatePDF(url, outputPath, options = {}) {
  const {
    format = 'A4',
    landscape = false,
    margin = { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
    printBackground = true,
    waitForSelector = null,
    delay = 0
  } = options;

  const response = await fetch(`${PLAYWRIGHT_SERVER}/pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url,
      format,
      landscape,
      margin,
      printBackground,
      waitForSelector,
      delay
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`PDF generation failed: ${error}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  console.log(`PDF saved: ${outputPath}`);
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const url = args[0];
  const outputPath = args[1] || 'output.pdf';
  
  if (!url) {
    console.log('Usage: node pdf-export.js <url> [output-path] [options]');
    console.log('Options: --format=A4|Letter|Legal, --landscape, --wait-for=selector, --delay=ms');
    process.exit(1);
  }
  
  const options = {
    format: args.find(a => a.startsWith('--format='))?.split('=')[1] || 'A4',
    landscape: args.includes('--landscape'),
    waitForSelector: args.find(a => a.startsWith('--wait-for='))?.split('=')[1],
    delay: parseInt(args.find(a => a.startsWith('--delay='))?.split('=')[1] || '0')
  };
  
  generatePDF(url, outputPath, options).catch(console.error);
}

module.exports = { generatePDF };
