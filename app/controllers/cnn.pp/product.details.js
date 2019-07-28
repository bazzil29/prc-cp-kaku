const puppeteer = require("puppeteer");

const self = {
  page: null,
  browser: null,
  init: async product_url => {
    console.log(product_url);
    self.browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    self.page = await self.browser.newPage();

    await self.page.goto(product_url, {
      waitUntil: "networkidle2"
    });

    const result = await self.page.evaluate(() => {
      const title = document.querySelector(
        'h1[class="product_title entry-title"]'
      ).innerText;

      const query = del
        ? 'span[class="price"] ins span'
        : 'span[class="price"] span';

      const price = parseInt(
        document
          .querySelector(query)
          .innerText.split(".")
          .join("")
      );
      return {
        title,
        price
      };
    });
    await self.page.close();
    await self.browser.close();

    return result;
  }
};

module.exports = self;

// module.exports = {
//   get: async product_url => {
//     const browser = await puppeteer.launch({
//       headless: false
//     });
//     console.log(product_url);
//     const page = await browser.newPage();

//     await page.goto(product_url, {
//       waitUntil: "networkidle2"
//     });

//     const result = await page.evaluate(() => {
//       const title = document.querySelector(
//         'h1[class="product_title entry-title"]'
//       ).innerText;

//       const price = parseInt(
//         document
//           .querySelector('p[class="price"] span')
//           .innerText.split(".")
//           .join("")
//       );
//       return {
//         title,
//         price
//       };
//     });
//     await browser.close();
//     return result;
//   }
// };
