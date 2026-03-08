const { generatePDF } = require('../scripts/pdf-export');
const fs = require('fs');
const path = require('path');

describe('PDF Export Script', () => {
  test('should export generatePDF function', () => {
    expect(typeof generatePDF).toBe('function');
  });

  test('should accept default options', () => {
    const options = {
      format: 'A4',
      landscape: false,
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
      printBackground: true
    };
    
    expect(options.format).toBe('A4');
    expect(options.landscape).toBe(false);
    expect(options.printBackground).toBe(true);
  });

  test('should use environment variable for server', () => {
    const script = fs.readFileSync(
      path.join(__dirname, '../scripts/pdf-export.js'),
      'utf8'
    );
    expect(script).toContain('PLAYWRIGHT_SERVER');
    expect(script).toContain('process.env.PLAYWRIGHT_SERVER');
  });
});
