const express = require("express");

const { postAddCategory, getCategory } = require("../controller/category");
const { requireSignIn, adminMiddleware } = require("../middleware");
const router = express.Router();

router.post(
  "/category/create",
  requireSignIn,
  adminMiddleware,
  postAddCategory
);
router.get("/category/getcategory", getCategory);

module.exports = router;
