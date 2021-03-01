const express = require("express");
const {
  signUp_get,
  signUp_post,
  login_get,
  login_post,
  logout_get,
} = require("../controllers/authController");

const router = express.Router();

router.get("/login", login_get);
router.post("/login", login_post);
router.get("/signup", signUp_get);
router.post("/signup", signUp_post);
router.get("/logout", logout_get);

module.exports = router;
