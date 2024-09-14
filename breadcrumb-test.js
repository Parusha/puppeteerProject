import puppeteer from 'puppeteer';

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: false }); // Set headless: true for background execution
  const page = await browser.newPage();

  // Set the viewport size to a desktop resolution
  await page.setViewport({ width: 1920, height: 1080 });
  // Set the viewport size to a mobile resolution
//   await page.setViewport({ width: 1080, height: 1024 });

  // Navigate to the webpage you want to test
  await page.goto('https://new.hollywoodbets.net/', { waitUntil: 'networkidle2' });

  try {
    // Wait for the page to load completely before searching for elements
    await page.waitForSelector('body');

    // Simulate a click anywhere on the screen (clicking at the center of the screen)
    await page.mouse.click(960, 540); // Coordinates for the center of a 1920x1080 screen

    // Use the XPath to find the element containing the text "Lucky Numbers"
    const luckyNumbersElement = await page.evaluateHandle(() => {
      return document.evaluate(
        "//div[contains(text(), 'Lucky Numbers')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
    });

    // Ensure the element was found
    if (luckyNumbersElement) {
      // Click on the element
      await luckyNumbersElement.click();

      // Wait for the breadcrumbs to load
      await page.waitForSelector('#breadcrumbs-outer-container', { timeout: 30000 }); // Adjust this selector and timeout as needed
    } else {
      console.error('Element containing text "Lucky Numbers" not found.');
    }

  } catch (error) {
    console.error('Error clicking the element or the screen:', error);
  }

  // Function to check if "Lucky Numbers" and "Countries" are in the breadcrumb
  const checkBreadcrumbText = async () => {
    try {
      // Wait for breadcrumb container to be visible
      await page.waitForSelector('.BreadcrumbLinkContainer-sc-1gx92gx-4.fKaZuk', { timeout: 30000 }); // Adjust timeout as needed

      // Get breadcrumb texts
      const breadcrumbTexts = await page.evaluate(() => {
        const breadcrumbContainer = document.querySelector('.BreadcrumbLinkContainer-sc-1gx92gx-4.fKaZuk');
        return Array.from(breadcrumbContainer.querySelectorAll('a, span'))
          .map(breadcrumb => breadcrumb.innerText.trim());
      });

      // Check for "Lucky Numbers" in the breadcrumb
      const hasLuckyNumbers = breadcrumbTexts.includes('Lucky Numbers');
      if (hasLuckyNumbers) {
        console.log('"Lucky Numbers" is present in the breadcrumb.');
      } else {
        console.error('"Lucky Numbers" is not present in the breadcrumb.');
      }

      // Check for "Countries" in the breadcrumb
      const hasCountries = breadcrumbTexts.includes('Countries');
      if (hasCountries) {
        console.log('"Countries" is present in the breadcrumb.');
      } else {
        console.error('"Countries" is not present in the breadcrumb.');
      }
    } catch (error) {
      console.error('Failed to check breadcrumb text:', error);
    }
  };

  // Run the breadcrumb text check
  await checkBreadcrumbText();

  // Close the browser
  await browser.close();
})();
