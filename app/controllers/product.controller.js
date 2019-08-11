const getDetails = require("./cnn.pp/product.details");
const getListUrl = require("./cnn.pp/cnn.urls");
const Product = require("../models/product.model");
const Cnn = require("./cnn.pp/product.details");
const ProductSku = require("../models/productBySku");
const uuidv1 = require("uuid");
const cnnGetUrls = require("./cnn.pp/cnn.urls");
const cnnGetAllUrls = require("./cnn.pp/getAllcategoriesurls");
const getProductFromCategoryUrl = require("./cnn.pp/detailsFromCategoryUrl");

const wss = require("./wss.pp/oneSku");

const getSingle = async (id = []) => {
  if (!!id) {
    return await Product.findById(id);
  }
};

const getAll = async () => {
  return await Product.find();
};

const crawlAll = async shopId => {
  if (shopId == 2) {
    const urls = await cnnGetAllUrls.init();
    for (let url of urls) {
      await crawlFromCategories(url, 2);
    }
  }
};

const crawlFromCategories = async category_url => {
  try {
    const products = await getProductFromCategoryUrl.ini(category_url);
    for (let product of products) {
      createOrUpdateOneProduct(product, 2);
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createOrUpdateOneProduct = async (details, shopId) => {
  const product = await Product.findOne({ url: details.url });
  if (!!product) {
    const date = new Date();
    product.last_get_price = date.getTime();
    product.old_price = product.last_price;
    product.last_price = details.price;
    product.shop = shopId;
    product.last_change =
      product.old_price != product.last_price
        ? date.getTime()
        : product.last_change;
    await product.save();
    console.log(details.url);
    return product;
  } else {
    const date = new Date();
    const newProduct = await new Product({
      _id: uuidv1(),
      title: details.title,
      created_date: date.getTime(),
      last_get_price: date.getTime(),
      last_change: date.getTime(),
      last_price: details.price,
      old_price: details.price,
      url: productUrl,
      shop: shopId
    });
    await newProduct.save();
    console.log(details.url);
    return newProduct;
  }
};

const crawlOne = async (productUrl, shopId) => {
  const product = await Product.findOne({ url: productUrl });
  const details = await Cnn.init(productUrl);

  if (!!product) {
    const date = new Date();
    product.last_get_price = date.getTime();
    product.old_price = product.last_price;
    product.last_price = details.price;
    product.last_change =
      product.old_price != product.last_price
        ? date.getTime()
        : product.last_change;
    await product.save();
    return product;
  } else {
    if (shopId == 2) {
      const date = new Date();
      const newProduct = await new Product({
        _id: uuidv1(),
        title: details.title,
        created_date: date.getTime(),
        last_get_price: date.getTime(),
        last_change: date.getTime(),
        last_price: details.price,
        old_price: details.price,
        url: productUrl,
        shop: shopId
      });
      await newProduct.save();
      return newProduct;
    }
  }
};

module.exports = {
  one: async (req, res) => {
    const { productUrl, shopId } = req.fields;
    try {
      const product = await crawlOne(productUrl, shopId);
      if (!!product) {
        res.send({
          status: true,
          product
        });
      }
    } catch (error) {
      console.log(error);
      res.send({
        status: false
      });
    }
  },

  multi: async (req, res) => {
    try {
      const { url, shopId } = req.fields;
      if (crawlFromCategories(url, shopId)) {
        res.send({
          status: true
        });
      } else {
        res.send({
          status: false
        });
      }
    } catch (error) {
      console.log(error);
      res.send({
        statu: false
      });
    }
  },

  all: async (req, res) => {
    try {
      const { shopId } = req.fields;
      crawlAll(shopId);
      res.send({
        status: true,
        message: "Crawler is running in this congnghenhat.com"
      });
    } catch (error) {
      console.log(error);
    }
  },

  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      res.send(await getSingle(id));
    } catch (error) {
      console.log(error);
    }
  },

  getAllProduct: async (req, res) => {
    try {
      res.send({
        products: await getAll()
      });
    } catch (error) {
      console.log(error);
    }
  },
  addOrCrawlSku: async (req, res) => {
    try {
      const sku = req.body.sku.trim().replace(/\s+/g, "-");
      const product = await ProductSku.findById(sku);
      if (!!product) {
        const { productsByShops, type } = await wss.init(sku);
        if (!!productsByShops && productsByShops.length > 0) {
          product.shops = productsByShops;
          product.type = type;
          await product.save();
          res.send({ success: true });
        } else {
          res.send({
            success: false
          });
        }
      } else {
        const { productsByShops, type } = await wss.init(sku);
        if (!!productsByShops && productsByShops.length > 0) {
          const newProductSku = await new ProductSku({
            _id: sku,
            title: productsByShops[0].title,
            shops: productsByShops,
            type: type
          });
          await newProductSku.save();
          res.send({ success: true });
        } else {
          res.send({
            success: false
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.send({
        success: false
      });
    }
  }
};
