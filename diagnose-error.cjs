const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    
    const errors = [];
    page.on('pageerror', err => {
      errors.push({ type: 'pageerror', message: err.message, stack: err.stack });
    });
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push({ type: 'console.error', text: msg.text() });
      }
    });

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    console.log('=== BROWSER ERRORS REPORT ===');
    console.log('Total errors:', errors.length);
    errors.forEach((e, idx) => {
      console.log(`[${idx+1}] [${e.type}]`, e.message || e.text);
    });

    await browser.close();
  } catch (err) {
    console.error('Diagnostic run failed:', err);
    process.exit(1);
  }
})();
