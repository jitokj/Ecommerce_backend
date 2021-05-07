const express = require("express");

const { createProduct } = require("../controller/product");
const { requireSignIn, adminMiddleware } = require("../middleware");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignIn,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);
// router.get("/category/getcategory", getCategory);

module.exports = router;
