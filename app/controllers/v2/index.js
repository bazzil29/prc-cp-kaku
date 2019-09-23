const test = require("./crawler");
const handler = require("./DOMHandler");
let config = require("./config.json"); 

(async () => {
    const url = config.shops[0].searchUrl + "ht-k6k"
    const a = await test.ini(url,handler[config.shops[0].type]);
})();
