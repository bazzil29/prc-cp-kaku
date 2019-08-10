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

      if (!!link) {
        if (link.includes("so-sanh.htm")) {
          // await Promise.all([
          //   self.page.click(`a[href="${link}"]`),
          //   self.page.waitForNavigation({ waitUntil: "domcontentloaded" })
          // ]);
          // const result = await self.page.evaluate(() => {
          //   table = document.querySelector("table");
          //   const result = [];
          //   listRow = table.querySelectorAll("tr");
          //   listRow.forEach(row => {
          //     sourceC = row.querySelector('span[class="rate"]');
          //     locationC = row.querySelector('span[class="location"]');
          //     priceC = row.querySelector('span[class="price"]');
          //     {
          //       if (!!sourceC && !!locationC && !!priceC)
          //         result.push({
          //           source: sourceC.innerText,
          //           location: locationC.innerText,
          //           price: priceC.innerText,
          //           url: row.querySelector("h3").querySelector("a").href,
          //           title: row.querySelector("h3").querySelector("a").title
          //         });
          //     }
          //   });
          //   return !!result ? result : false;
          // });
          // console.log(result);
          // await self.page.close();
          // await self.browser.close();
          // return result;

          const result = await self.page.evaluate(() => {
            list = document
              .querySelector('ul[class="list-item list-product-search"]')
              .querySelectorAll("li");

            if (list.length == 0) return false;

            const result = [];
            for (let i = 1; i < list.length; i++) {
              console.log(!!list[i]);
              const locationC = list[i].querySelector("div.provins");
              const sourceC = list[i].querySelector("div.img-merchant-wrap a");
              const priceC = list[i].querySelector("div.price");
              const titleC = !!list[i].querySelector("h3")
                ? list[i].querySelector("h3").querySelector("a")
                : null;
              if (!!sourceC && !!priceC && !!titleC)
                result.push({
                  source: sourceC.title,
                  location: !!locationC ? locationC.innerText : null,
                  price: priceC.innerText,
                  url: sourceC.href,
                  title: titleC.title
                });
            }
            return !!result ? result : false;
          });
          await self.page.close();
          await self.browser.close();
          return result;
        } else {
          const result = await self.page.evaluate(() => {
            list = document
              .querySelector('ul[class="list-item list-product-search"]')
              .querySelectorAll("li");

            if (list.length == 0) return false;

            const result = [];
            list.forEach(item => {
              const location = item.querySelector("div.provins");
              result.push({
                source: item.querySelector("div.img-merchant-wrap a").title,
                location: !!location ? location.innerText : null,
                price: item.querySelector("div.price").innerText,
                url: item.querySelector("div.img-merchant-wrap a").href,
                title: item.querySelector("h3").querySelector("a").title
              });
            });
            return !!result ? result : false;
          });
          console.log(result);
          await self.page.close();
          await self.browser.close();
          return result;
        }
      } else return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};

module.exports = self;
