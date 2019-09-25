const express = require("express");
const router = express.Router();

const productController = require("../../controllers/v2/controller");

router.get("/shops", productController.getShops);
router.get("/sku", productController.getSkus);
router.delete("/sku/:sku", productController.deleteSku);
router.post("/one", productController.searchProduct);
router.get("/shops/:shop", productController.getShopProducts);


module.exports = router;
