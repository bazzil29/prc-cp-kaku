const puppeteer = require("puppeteer");

const self = {
  page: null,
  browser: null,

  ini: async base_url => {
    self.browser = await puppeteer.launch({
      headless: true
    });

    self.page = await self.browser.newPage();
    await self.page.goto(base_url, {
      waitUntil: "networkidle0"
    });

    const result = await self.page.evaluate(() => {
      const nodelist = document.querySelectorAll('div[class="product-inner"]');
      const products = [];
      for (let node of nodelist) {
        console.log(node);
        const del = node.querySelector('span[class="price"] del');
        const query = del
          ? 'span[class="price"] ins span'
          : 'span[class="price"] span';

        products.push({
          url: node.querySelector('a[class="thumb-link"]').href,
          price: parseInt(
            node
              .querySelector(query)
              .innerText.split(".")
              .join("")
          ),
          title: node.querySelector("h3 a").innerText
        });
      }
      return products;
    });

    console.log(result);
    return result;
  }
};

module.exports = self;
