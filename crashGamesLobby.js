import puppeteer from 'puppeteer';

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: false }); // Set headless: true for background execution
  const page = await browser.newPage();

  // Emulate the timestamp
  await page.evaluate(() => {
    Date.now = () => 1695177600000; // Timestamp for 20th September 2024
  });

  // Set the viewport size
  await page.setViewport({ width: 1920, height: 1080 });

  // Navigate to the webpage and wait until the network is idle
  await page.goto('https://new.hollywoodbets.net/', { waitUntil: 'networkidle2' });

  try {
    // Wait for the body to ensure initial load
    await page.waitForSelector('body');

    // Wait for specific elements to ensure they are loaded
    // For example, wait for a specific span or any other element that indicates page readiness
    await page.waitForSelector('span'); // Adjust selector based on your needs

    // Perform actions on the page
    await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('span'));
      const targetElement = elements.find(el => el.textContent.trim() === 'Crash Games');
      if (targetElement) {
        targetElement.click();
      }
    });

    // Optionally wait for navigation if clicking triggers a page change
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Take the screenshot
    await page.screenshot({ path: 'crashGameLobby.png' });

  } catch (error) {
    console.error('Error during the process:', error);
  }

  // Close the browser
  await browser.close();
})();
