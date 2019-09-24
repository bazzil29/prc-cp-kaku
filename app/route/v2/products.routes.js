const express = require("express");
const router = express.Router();

const productController = require("../../controllers/v2/controller");

router.get("/shop", productController.getShops);
router.get("/sku", productController.getSkus);
router.post("/one", productController.searchProduct);

module.exports = router;
