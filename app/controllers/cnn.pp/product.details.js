const puppeteer = require("puppeteer");

const self = {
  page: null,
  browser: null,

  init: async product_url => {
    console.log(product_url);
    self.browser = await puppeteer.launch({
      headless: false
    });
    self.page = await self.browser.newPage();

    await self.page.goto(product_url, {
      waitUntil: "networkidle0"
    });

    const result = await self.page.evaluate(() => {
      const title = document.querySelector(
        'h1[class="product_title entry-title"]'
      ).innerText;

      const price = parseInt(
        document
          .querySelector('p[class="price"] span')
          .innerText.split(".")
          .join("")
      );
      return {
        title,
        price
      };
    });
    console.log(result);

    return result;
  }
};

module.exports = self;
