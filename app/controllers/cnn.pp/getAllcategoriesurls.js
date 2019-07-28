const puppeteer = require("puppeteer");

const self = {
  page: null,
  browser: null,
  init: async () => {
    const cnnUrl = "https://congnghenhat.com";

    self.browser = await puppeteer.launch({
      headless: true
    });

    self.page = await self.browser.newPage();

    await self.page.goto(cnnUrl, {
      waitUntil: "networkidle0"
    });

    const urls = await self.page.evaluate(() => {
      console.log("a");
      const result = [];
      const regex = /sanpham/i;
      const nodelist = document.querySelectorAll('a[class="menu-link"]');
      for (let node of nodelist) {
        if (regex.test(node.href)) result.push(node.href);
      }
      return result;
    });
    return urls;
  }
};

module.exports = self;
