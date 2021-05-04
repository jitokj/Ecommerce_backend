const express = require('express');

const router = express.Router();
const { postSignUp, postSignIn } = require("../controller/auth");

router.post('/signin',postSignIn);

router.post('/signup',postSignUp);

module.exports = router;