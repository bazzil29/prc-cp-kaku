const cnn = require("./cnn.urls");

(async () => {
  const a = await cnn.ini("https://congnghenhat.com/sanpham/bep-tu");
  console.log(a);
})();
