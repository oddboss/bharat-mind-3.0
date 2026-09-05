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
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('textarea', { timeout: 10000 });

    // Click popular chip
    const chip = await page.$('button.group');
    if (chip) {
      await chip.click();
      console.log('Clicked chip');
      await new Promise(r => setTimeout(r, 4000));
    }

    // Check for any visible error banner on the page
    const errorTexts = await page.evaluate(() => {
      const allText = document.body.innerText;
      const lines = allText.split('\n');
      return lines.filter(l => l.toLowerCase().includes('error') || l.toLowerCase().includes('failed') || l.toLowerCase().includes('500') || l.toLowerCase().includes('offline'));
    });

    console.log('Errors in console:', errors);
    console.log('Error-like text on page:', errorTexts);

    const shotPath = 'C:/Users/intel/.gemini/antigravity/brain/82f8974f-1098-4852-a174-2edf74be00c8/diagnostic_click.png';
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log('Screenshot saved to:', shotPath);

    await browser.close();
  } catch (err) {
    console.error('Test run failed:', err);
    process.exit(1);
  }
})();
