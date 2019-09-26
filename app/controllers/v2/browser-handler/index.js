const test = require("./crawler");
const handler = require("./DOMHandler");
let config = require("./config.json"); 

(async () => {
    const url = config.shops[3].searchUrl + "HT-K200XTWF"
    const a = await test.ini(url,handler[config.shops[3].type]);
    console.log(a);
})();
