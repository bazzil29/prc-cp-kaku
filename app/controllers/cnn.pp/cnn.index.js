const cnn = require("./cnn.urls");

(async () => {
  const a = await cnn.ini("https://congnghenhat.com/sanpham/may-hut-mui");
  console.log(a);
})();
