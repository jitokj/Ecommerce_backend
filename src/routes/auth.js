const express = require("express");

const router = express.Router();
const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require("../validator/auth");

const { postSignUp, postSignIn } = require("../controller/auth");

router.post("/signin", validateSignInRequest, isRequestValidated, postSignIn);

router.post("/signup", validateSignUpRequest, isRequestValidated, postSignUp);

// router.post("/profile",requireSignIn,(req,res)=>{
//     res.status(200).json({
//         user: "profile"
//     })
// })

module.exports = router;
