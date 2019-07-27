const getDetails = require("./cnn.pp/product.details");
const getListUrl = require("./cnn.pp/cnn.urls");
const Product = require("../models/product.model");
const Cnn = require("./cnn.pp/product.details");
module.exports = {
  single: async (req, res) => {
    console.log(Cnn);
    const { productUrl, shopId } = req.fields;
    console.log(shopId);
    try {
      const product = await Product.find({ url: productUrl });
      console.log(product);
      if (product.length > 0) {
      } else {
        if (shopId == 2) {
          const details = await Cnn.init(productUrl);
          console.log(details);
        }
        res.send({ status: 300 });
      }
    } catch (error) {}
  }
};
