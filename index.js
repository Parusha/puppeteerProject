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
  await page.screenshot({ path: '1loginScreen.png' });

  // Type into the username and password fields
  await page.type('#Username', '0614694645'); // Replace with your actual username
  await page.type('#password', 'David0000001$'); // Replace with your actual password

  // Click the login button
  await page.click('#btnLogin');

  // Wait for navigation or some element that appears after login
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await page.screenshot({ path: '2loggedIn.png' });

  // Click the hamburger menu icon
  await page.waitForSelector('[data-testid="burger-icon"]');
  await page.click('[data-testid="burger-icon"]');
  await page.screenshot({ path: '3leftMenu.png' });

  // Wait for the menu to expand and display the options
  await page.waitForSelector('div.iconAndText', { visible: true });

  // Click the element containing the text "Account"
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
 // Click the Logout element based on its text content
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

  // Take a screenshot after clicking the Logout element
  await page.screenshot({ path: '5loggedOut.png' });

  // Close the browser
  await browser.close();
})();
