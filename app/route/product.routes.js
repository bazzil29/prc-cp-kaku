const express = require("express");
const router = express.Router();

const userController = require("../controllers/product.controller");

router.post("/new", userController.single);

module.exports = router;
