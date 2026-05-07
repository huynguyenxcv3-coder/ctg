import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5000', { waitUntil: 'networkidle0' });
  
  // Check for horizontal overflow
  const layoutCheck = await page.evaluate(() => {
    const root = document.getElementById('root');
    const html = document.documentElement;
    const body = document.body;
    
    // get all elements that are wider than viewport
    const overflowingElements = Array.from(document.querySelectorAll('*')).filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > window.innerWidth || rect.right > window.innerWidth;
    }).map(el => ({
      tag: el.tagName,
      className: el.className,
      width: el.getBoundingClientRect().width,
      right: el.getBoundingClientRect().right,
      viewportWidth: window.innerWidth
    }));

    return {
      rootWidth: root?.scrollWidth,
      htmlWidth: html.scrollWidth,
      bodyWidth: body.scrollWidth,
      overflowingElements: overflowingElements.slice(0, 10) // top 10
    };
  });

  console.log('LAYOUT CHECK:', JSON.stringify(layoutCheck, null, 2));

  await browser.close();
})();
