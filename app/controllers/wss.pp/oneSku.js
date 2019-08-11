const pupp = require("puppeteer");
const URL = "https://websosanh.vn/";

const self = {
  page: null,
  browser: null,

  init: async sku => {
    try {
      self.browser = await pupp.launch({
        headless: true,
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
        self.page.waitForNavigation({ waitUntil: "networkidle2" })
      ]);

      const result = await self.page.evaluate(() => {
        let type = null;
        a = document.querySelector("div.filter-item");
        if (!!a && a.querySelector("h4").innerText == "Tìm sản phẩm trong") {
          type = a
            .querySelector("div.control-group input")
            .getAttribute("data-name");
        }

        list = document
          .querySelector('ul[class="list-item list-product-search"]')
          .querySelectorAll("li");

        if (list.length == 0) return false;

        const result = [];
        for (let i = 0; i < list.length; i++) {
          const checkLink = list[i].querySelector("a");
          if (!!checkLink) {
            const href = checkLink.href;
            if (href.includes("so-sanh.htm")) {
              continue;
            }
          } else {
            continue;
          }

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
        return !!result && type ? { productsByShops: result, type } : false;
      });

      await self.page.close();
      await self.browser.close();

      return result;

      // ------------
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
      // ---------------
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};

module.exports = self;
