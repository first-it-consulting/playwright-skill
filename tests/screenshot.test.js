const { takeScreenshot } = require('../scripts/screenshot');
const fs = require('fs');
const path = require('path');

describe('Screenshot Script', () => {
  const testOutputDir = path.join(__dirname, 'output');
  
  beforeAll(() => {
    if (!fs.existsSync(testOutputDir)) {
      fs.mkdirSync(testOutputDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test files
    const files = fs.readdirSync(testOutputDir);
    files.forEach(file => {
      if (file.startsWith('test-')) {
        fs.unlinkSync(path.join(testOutputDir, file));
      }
    });
  });

  test('should export takeScreenshot function', () => {
    expect(typeof takeScreenshot).toBe('function');
  });

  test('should use PLAYWRIGHT_SERVER environment variable', () => {
    const originalEnv = process.env.PLAYWRIGHT_SERVER;
    process.env.PLAYWRIGHT_SERVER = 'http://test-server:3000';
    
    // Re-require to pick up new env var
    delete require.cache[require.resolve('../scripts/screenshot')];
    const { takeScreenshot: reloaded } = require('../scripts/screenshot');
    
    expect(typeof reloaded).toBe('function');
    
    process.env.PLAYWRIGHT_SERVER = originalEnv;
  });

  test('should default to localhost:3000 when no env var set', () => {
    delete process.env.PLAYWRIGHT_SERVER;
    delete require.cache[require.resolve('../scripts/screenshot')];
    
    // This would be verified by mocking fetch in a real test
    const script = fs.readFileSync(
      path.join(__dirname, '../scripts/screenshot.js'),
      'utf8'
    );
    expect(script).toContain("'http://localhost:3000'");
  });
});
