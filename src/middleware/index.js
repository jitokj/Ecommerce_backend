const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

exports.requireSignIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, secret);
    req.user = user;
  } else {
    return res.status(401).json({ message: "Authorization Required" });
  }
  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(401).json({ message: "user acees Denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "admin acees Denied" });
  }
  next();
};
