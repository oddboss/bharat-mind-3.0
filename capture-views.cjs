const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1480, height: 960, deviceScaleFactor: 1.5 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });

    const navButtons = await page.$$('aside button');
    
    // ERP & BI
    for (const btn of navButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('ERP & BI')) {
        await btn.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 800));
    const erpPath = 'C:/Users/intel/.gemini/antigravity/brain/82f8974f-1098-4852-a174-2edf74be00c8/erp_view.png';
    await page.screenshot({ path: erpPath, fullPage: false });
    console.log('Saved ERP view to:', erpPath);

    // Forecast & Decisions
    for (const btn of navButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Forecast & Decisions')) {
        await btn.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 800));
    const fcPath = 'C:/Users/intel/.gemini/antigravity/brain/82f8974f-1098-4852-a174-2edf74be00c8/forecast_view.png';
    await page.screenshot({ path: fcPath, fullPage: false });
    console.log('Saved Forecast view to:', fcPath);

    await browser.close();
  } catch (err) {
    console.error('Error capturing views:', err);
    process.exit(1);
  }
})();
