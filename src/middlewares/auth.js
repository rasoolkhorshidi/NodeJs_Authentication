const config = require("config");
const jwt = require("jsonwebtoken");
const { User } = require("./../models/user");

async function isLoggedIn(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("access is denied");
  try {
    const decoded = jwt.verify(token, config.get("security.jwtSecret"));
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
}

async function isAdmin(req, res, next) {
  if (req.user.admin == true) {
    next();
  } else {
    res.status(403).send("access is denied");
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
};
