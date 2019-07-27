const getDetails = require("./cnn.pp/product.details");
const getListUrl = require("./cnn.pp/cnn.urls");
const Product = require("../models/product.model");
const Cnn = require("./cnn.pp/product.details");
module.exports = {
  single: async (req, res) => {
    const { productUrl, shopId } = req.fields;
    try {
      const product = await Product.findOne({ url: productUrl });
      console.log(product);
      if (!!product) {
      } else {
        if (shopId == 2) {
          const details = await Cnn.init(productUrl);
          console.log(details);
        }
      }
    } catch (error) {
      console.log(error);
      res.send({
        status: 300
      });
    }
  }
};
