const puppeteer = require("puppeteer");

const self = {
  page: null,
  browser: null,
  ini: async (base_url,handler) => {
    self.browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });


    self.page = await self.browser.newPage();

    await self.page.setRequestInterception(true);
    self.page.on('request', (request) => {
        if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
            request.abort()
            .then(()=>{})
            .catch(()=>{})
        } else {
            request.continue()
            .then(()=>{})
            .catch(()=>{})
        }
    });

    await self.page.goto(base_url, {
        waitUntil: "networkidle2"
    });
    
    const result = await self.page.evaluate(await handler);
    await self.page.close();
    await self.browser.close();
    return (!!result)?result:null;  
  }
};

module.exports = self;
