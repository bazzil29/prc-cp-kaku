const test = require("./crawler");
const handler = require("./DOMHandler");
let config = require("./config.json"); 

(async () => {
    const url = "https://www.donhatnoidia.com/collections/dien-lanh/products/tu-lanh-hitachi-r-wx74k?variant=29416753299490";
    const a = await test.ini(url,handler[config.shops[3].type].fixUrl);
    console.log(a);
})();
