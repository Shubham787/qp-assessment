const express = require("express");
const router = express.Router();
const { jwtVerify, jwtVerifyAndDecode } = require("../middleware/jwt");
const checkUser = require("../middleware/checkUser");
const orderController = require("../controllers/orderController");

router.post("/makeOrder", jwtVerify, function (req, res) {
  return orderController.makeOrder(req, res);
});

router.get("/allOrders", checkUser, jwtVerify, function (req, res) {
  return orderController.allOrders(req, res);
});

router.get("/userOrders", jwtVerify, function (req, res) {
  return orderController.userOrders(req, res);
});

module.exports = router;
