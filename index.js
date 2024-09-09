import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false }); // Use headless: false to observe the process
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto('https://new.hollywoodbets.net/');
  
  // Set the screen size (optional)
  await page.setViewport({ width: 1080, height: 1024 });

  // Wait for the "Log in" button to be present
  await page.waitForSelector('div[role="presentation"]');

  // Click the "Log in" button
  await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll('div[role="presentation"]'))
      .find(div => div.innerText.trim() === 'Log in');
    
    if (button) {
      button.click();
    } else {
      console.log('Button not found');
    }
  });

  // Wait for the login form to load
  await page.waitForSelector('#Username');

  // Type into the username and password fields
  await page.type('#Username', '0614694645'); // Replace with your actual username
  await page.type('#password', 'David0000001$'); // Replace with your actual password (corrected ID for password)

  // Click the login button
  await page.click('#btnLogin');

  // Wait for navigation or some element that appears after login
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // Take a screenshot after login
  await page.screenshot({ path: 'loggedIn.png' });

  // Close the browser
  await browser.close();
})();
