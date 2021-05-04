const express = require('express');

const router = express.Router();
const userController = require("../controller/user");

router.post('/signin',(req,res,next)=>{
  
});

router.post('/signup',userController.postSignUp);

module.exports = router;