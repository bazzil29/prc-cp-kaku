const express = require("express");
const router = express.Router();

const userController = require("../controllers/product.controller");

router.post("/one", userController.one);
router.post("/multi", userController.multi);
router.post("/all", userController.all);
router.get("/:id", userController.getSingle);
router.get("/", userController.getAllProduct);
router.post("/sku", userController.addOrCrawlSku);
module.exports = router;
