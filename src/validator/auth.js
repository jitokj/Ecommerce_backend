const { check, validationResult } = require("express-validator");

exports.validateSignUpRequest = [
  check("firstName").notEmpty().withMessage("firstName is Required"),
  check("lastName").notEmpty().withMessage("lastName is Required"),
  check("email").isEmail().withMessage("Email is not Valid"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleat 6 characters long"),
];

exports.validateSignInRequest = [
  check("email").isEmail().withMessage("Email is not Valid"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleat 6 characters long"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
