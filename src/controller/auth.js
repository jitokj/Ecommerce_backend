const User = require("../models/user");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

exports.postSignUp = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(404).json({
        message: "User already registered",
      });
    }
    if (error) {
      return res.status(400).json({
        message: "Error occured!",
      });
    }
    const { firstName, lastName, email, password } = req.body;

    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
    });

    _user.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: "something went wrong",
        });
      }
      if (data) {
        console.log("created user-->", data);
        return res.status(201).json({
          message: "user created Successfuly",
        });
      }
    });
  });
};

exports.postSignIn = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id, role: user.role }, secret, {
          expiresIn: "6h",
        });
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(403).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something Went Wrong",
      });
    }
  });
};
