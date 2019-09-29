const test = require("./crawler");
const handler = require("./DOMHandler");
let config = require("./config.json"); 

(async () => {
    const url = "https://thietbinhat.com.vn/?s=ht-k6s";
    const a = await test.ini(url,handler[config.shops[5].type].search);
    console.log(a);
})();
