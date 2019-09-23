const puppeteer = require("puppeteer");

const self = {
  page: null,
  browser: null,
  ini: async (base_url,handler) => {
    self.browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    self.page = await self.browser.newPage();

    await self.page.goto(base_url, {
      waitUntil: "networkidle0"
    });

    const result = await self.page.evaluate(document => document,handler);

    // await self.page.close();
    // await self.browser.close();
    // return result;
  }
};

module.exports = self;
