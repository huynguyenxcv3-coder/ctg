import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  await page.setViewport({ width: 375, height: 667 }); // Mobile first check
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  // Check for horizontal overflow
  const layoutCheck = await page.evaluate(() => {
    const root = document.getElementById('root');
    const html = document.documentElement;
    const body = document.body;
    
    // get all elements that are wider than viewport or shifted right
    const overflowingElements = Array.from(document.querySelectorAll('*')).filter(el => {
      const rect = el.getBoundingClientRect();
      const isOverflowing = rect.width > window.innerWidth + 1 || rect.right > window.innerWidth + 1 || rect.left < -1;
      return isOverflowing;
    }).map(el => ({
      tag: el.tagName,
      className: el.className,
      id: el.id,
      rect: {
        width: el.getBoundingClientRect().width,
        right: el.getBoundingClientRect().right,
        left: el.getBoundingClientRect().left
      },
      viewportWidth: window.innerWidth
    }));

    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      htmlWidth: html.scrollWidth,
      bodyWidth: body.scrollWidth,
      overflowingElements: overflowingElements
    };
  });

  console.log('LAYOUT CHECK:', JSON.stringify(layoutCheck, null, 2));

  await browser.close();
})();
