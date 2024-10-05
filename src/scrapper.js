const puppeteer = require("puppeteer");

async function fetchReviews(siteurl) {
  try {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(siteurl);

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Click on the review button
    await Promise.all([
      await page.waitForNavigation(),
      await page.click(".HHrUdb"),
    ]);

    // Waiting for the loading of selector (.jftiEf) after the button click
    await page.waitForSelector(".jftiEf", { visible: true });

    // Page title
    const title = await page.title();

    // Getting the more buttons of the description and clicking each one of them
    const moreButtons = await page.$$(".w8nwRe");
    for (const button of moreButtons) {
      await button.click();
    }

    // Getting the Details
    const reviews = await page.$$eval(".jftiEf", (reviews) => {
      return reviews.map((review) => {
        const descriptionElement = review.querySelector(".wiI7pd");

        // Check if descriptionElement exists before trying to read its textContent
        const description = descriptionElement
          ? descriptionElement.textContent.trim()
          : "";

        return { description };
      });
    });

    await browser.close();

    return JSON.stringify(reviews);
  } catch (error) {
    console.error("Error:", error);
    return JSON.stringify({ error: error.message });
  }
}

module.exports = fetchReviews;
