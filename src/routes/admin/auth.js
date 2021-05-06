const express = require("express");

const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require("../../validator/auth");

const router = express.Router();

const { postSignUp, postSignIn } = require("../../controller/admin/auth");

router.post(
  "/admin/signin",
  validateSignInRequest,
  isRequestValidated,
  postSignIn
);

router.post(
  "/admin/signup",
  validateSignUpRequest,
  isRequestValidated,
  postSignUp
);

module.exports = router;
