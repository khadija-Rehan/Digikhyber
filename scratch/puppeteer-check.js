const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Capture console messages
    page.on('console', msg => {
      console.log(`PAGE LOG: ${msg.type().toUpperCase()} - ${msg.text()}`);
    });
    
    // Capture page errors
    page.on('pageerror', error => {
      console.log(`PAGE ERROR: ${error.message}`);
    });
    
    // Capture failed requests
    page.on('requestfailed', request => {
      console.log(`REQUEST FAILED: ${request.url()} - ${request.failure().errorText}`);
    });

    console.log("Navigating to http://localhost:3000 ...");
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
    
    const rootHtml = await page.evaluate(() => {
        const root = document.getElementById('root');
        return root ? root.innerHTML : 'NULL ROOT';
    });
    
    console.log("Root content snippet:", rootHtml.substring(0, 200));

    await browser.close();
  } catch (err) {
    console.error("Puppeteer Script Error:", err);
  }
})();
