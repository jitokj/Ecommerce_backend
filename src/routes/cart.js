const express = require("express");

const { addItemToCart } = require("../controller/cart");
const { requireSignIn, userMiddleware } = require("../middleware");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  requireSignIn,
  userMiddleware,
  addItemToCart
);
// router.get("/category/getcategory", getCategory);

module.exports = router;
