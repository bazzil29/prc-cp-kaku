const express = require("express");
const router = express.Router();

const productController = require("../../controllers/v2/controller");

router.get("/shops", productController.getShops);
router.get("/sku", productController.getSkus);
router.delete("/sku/:sku", productController.deleteSku);
router.get("/sku/:sku", productController.getProductsBySku);
router.post("/one", productController.searchProduct);
router.get("/all", productController.searchAll);
router.delete("/all", productController.deleteAll);
router.get("/shops/:shop", productController.getShopProducts);
router.post("/shops/:shop/sku/:sku", productController.editProduct);


module.exports = router;
