const express = require("express");
const {
  handleNewUserSignup,
  handleNewUserLogin,
} = require("../controllers/user");

const router = express.Router();

router.post("/signup", handleNewUserSignup);
router.post("/login", handleNewUserLogin);

module.exports = router;
