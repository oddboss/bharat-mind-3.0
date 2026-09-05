const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 1.5 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait 1.5s
    await new Promise(r => setTimeout(r, 1500));

    // Click on 'AI Assistant' in the left sidebar to open the Research Workspace
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('AI Assistant')) {
        await btn.click();
        console.log('Clicked AI Assistant navigation');
        break;
      }
    }

    // Wait 2.5s for research execution to complete and render
    await new Promise(r => setTimeout(r, 2500));

    const outputPath = 'C:/Users/intel/.gemini/antigravity/brain/82f8974f-1098-4852-a174-2edf74be00c8/research_workspace.png';
    await page.screenshot({ path: outputPath, fullPage: false });

    console.log('Research workspace screenshot saved to:', outputPath);
    await browser.close();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
