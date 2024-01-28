const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { saveUser } = require("../middleware/userAuth");

router.post("/signup", saveUser, function (req, res) {
  userController.signup(req, res);
});

router.post("/login", function (req, res) {
  userController.login(req, res);
});

module.exports = router;
