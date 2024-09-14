import puppeteer from 'puppeteer';

// Custom log function to record actions
function recordAction(action) {
  console.log(`[RECORDER] ${new Date().toISOString()}: ${action}`);
}

(async () => {
    // Launch the browser and open a new blank page, ignoring SSL certificate errors
    const browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,  // Bypass SSL certificate errors
      args: ['--ignore-certificate-errors'], // Additional flag to ignore certificate errors
    });
  
    const page = await browser.newPage();
    
    await page.evaluate(() => {
      Date.now = () => {
        return 1695177600000; // Replace with your timestamp
      };
    });
  
    // Record action
    recordAction('Launching browser and opening a new page.');
  
    // Navigate to the website
    await page.goto('https://localhost:8080/');
    recordAction('Navigated to https://localhost:8080/');
  
    // Set the screen size
    await page.setViewport({ width: 1080, height: 1024 });
    recordAction('Viewport set to width 1080 and height 1024.');

  // Wait for the "Log in" button to be present
  await page.waitForSelector('div[role="presentation"]');
  recordAction('Waiting for "Log in" button.');

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
  recordAction('"Log in" button clicked.');

  // Wait for the login form to load
  await page.waitForSelector('#Username');
  await page.screenshot({ path: '1loginScreen.png' });
  recordAction('Login form loaded and screenshot taken.');

  // Type the username and password
  await page.type('#Username', '0614694645');
  await page.type('#password', 'David0000001$');
  recordAction('Entered username and password.');

  // Click the login button
  await page.click('#btnLogin');
  recordAction('Login button clicked.');

  // Wait for navigation after login
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await page.screenshot({ path: '2loggedIn.png' });
  recordAction('Logged in successfully. Screenshot taken.');

  await page.mouse.click(960, 540);
  recordAction('Clicked at center of the screen.');

  // Click the hamburger menu icon
  await page.waitForSelector('[data-testid="burger-icon"]');
  await page.click('[data-testid="burger-icon"]');
  await page.screenshot({ path: '3leftMenu.png' });
  recordAction('Hamburger menu icon clicked.');

  // Wait for the menu to expand
  await page.waitForSelector('div.iconAndText', { visible: true });

  // Click the "Account" element
  await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('div.iconAndText .text'));
    const accountElement = elements.find(el => el.innerText.trim() === 'Account');
    if (accountElement) {
      accountElement.click();
    } else {
      console.log('Account element not found');
    }
  });
  await page.screenshot({ path: '4accountClicked.png' });
  recordAction('Account element clicked.');

  // Click the Logout element
  await page.evaluate(() => {
    const logoutElements = Array.from(document.querySelectorAll('div.MenuListItem-sc-12yco2i-0 .text'));
    const logoutElement = logoutElements.find(el => el.innerText.trim() === 'Logout');
    if (logoutElement) {
      logoutElement.click();
    } else {
      console.log('Logout element not found');
    }
  });

  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await page.screenshot({ path: '5loggedOut.png' });
  recordAction('Logout element clicked and user logged out.');

  // Close the browser
  await browser.close();
  recordAction('Browser closed.');
})();
