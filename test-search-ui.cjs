const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    const consoleLogs = [];
    page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));
    page.on('pageerror', err => consoleLogs.push({ type: 'pageerror', text: err.message }));

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('textarea', { timeout: 10000 });

    // Type a query
    await page.type('textarea', 'coffee machine');
    await new Promise(r => setTimeout(r, 500));

    // Press Enter to submit
    await page.keyboard.press('Enter');
    console.log('Submitted query: coffee machine');

    // Wait 5 seconds for response
    await new Promise(r => setTimeout(r, 5000));

    const shotPath = 'C:/Users/intel/.gemini/antigravity/brain/82f8974f-1098-4852-a174-2edf74be00c8/query_result_test.png';
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log('Screenshot saved to:', shotPath);

    console.log('Console logs:');
    consoleLogs.forEach(l => {
      if (l.type === 'error' || l.type === 'pageerror' || l.text.includes('error') || l.text.includes('Failed')) {
        console.log(`  [${l.type}] ${l.text}`);
      }
    });

    await browser.close();
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
})();
