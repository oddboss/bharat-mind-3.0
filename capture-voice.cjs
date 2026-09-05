const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 1.5 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });

    await page.waitForSelector('aside', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000));

    // Find and click Voice Assistant nav item
    const navButtons = await page.$$('aside button');
    for (const btn of navButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Voice Assistant')) {
        await btn.click();
        break;
      }
    }

    await new Promise(r => setTimeout(r, 1200));

    const outputPath = 'C:/Users/intel/.gemini/antigravity/brain/82f8974f-1098-4852-a174-2edf74be00c8/voice_assistant_modal.png';
    await page.screenshot({ path: outputPath, fullPage: false });

    console.log('Voice assistant screenshot saved to:', outputPath);
    await browser.close();
  } catch (err) {
    console.error('Error capturing voice assistant:', err);
    process.exit(1);
  }
})();
