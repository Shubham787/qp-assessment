const express = require("express");
const router = express.Router();
const { jwtVerify } = require("../middleware/jwt");
const checkUser = require("../middleware/checkUser");
const productController = require("../controllers/productController");

router.post("/createProduct", checkUser, jwtVerify, function (req, res) {
  return productController.createProduct(req, res);
});

router.get("/allProducts", function (req, res) {
  return productController.allProducts(req, res);
});

router.patch("/updateProduct", checkUser, jwtVerify, function (req, res) {
  return productController.updateProduct(req, res);
});

router.delete("/deleteProduct", checkUser, jwtVerify, function (req, res) {
  return productController.deleteProduct(req, res);
});

module.exports = router;
