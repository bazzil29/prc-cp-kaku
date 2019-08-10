const pupp = require("puppeteer");
const URL = "https://websosanh.vn/";

const self = {
  page: null,
  browser: null,

  init: async sku => {
    try {
      self.browser = await pupp.launch({
        headless: false,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      });

      self.page = await self.browser.newPage();
      await self.page.goto(URL, {
        waitUntil: "domcontentloaded"
      });

      await self.page.type("#inputFilter", sku);
      await Promise.all([
        self.page.click('button[id="btnFilter"]'),
        self.page.waitForNavigation({ waitUntil: "domcontentloaded" })
      ]);

      await Promise.all([
        self.page.click('button[id="btnFilter"]'),
        self.page.waitForNavigation({ waitUntil: "domcontentloaded" })
      ]);

      const link = await self.page.evaluate(() => {
        const imgWraper = document.querySelector(
          'div[class="img-wrap lazyload"]'
        );
        return !!imgWraper ? imgWraper.querySelector("a").href : false;
      });

      if (!!link)
        await Promise.all([
          self.page.click(`a[href="${link}"]`),
          self.page.waitForNavigation({ waitUntil: "domcontentloaded" })
        ]);
      else return false;

      const result = await self.page.evaluate(() => {
        table = document.querySelector("table");
        const result = [];
        listRow = table.querySelectorAll("tr");
        listRow.forEach(row => {
          sourceC = row.querySelector('span[class="rate"]');
          locationC = row.querySelector('span[class="location"]');
          priceC = row.querySelector('span[class="price"]');
          {
            if (!!sourceC && !!locationC && !!priceC)
              result.push({
                source: sourceC.innerText,
                location: locationC.innerText,
                price: priceC.innerText,
                url: row.querySelector("h3").querySelector("a").href,
                title: row.querySelector("h3").querySelector("a").title
              });
          }
        });
        return !!result ? result : false;
      });
      console.log(result);
      await self.page.close();
      await self.browser.close();
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};

module.exports = self;
