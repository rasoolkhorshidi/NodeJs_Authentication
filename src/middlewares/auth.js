const config = require("config");
const jwt = require("jsonwebtoken");
const { User } = require("./../models/user");

async function isLoggedIn(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  
  try {
    const decoded = jwt.verify(token, config.get("security.jwtSecret"));
    const user = await User.findById(decoded._id);
    
    if (!user) return res.status(404).send("User not found.");
    
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

async function isAdmin(req, res, next) {
  // First check if user exists
  if (!req.user) {
    return res.status(401).send("Authentication required.");
  }
  
  // Then check admin status
  if (req.user.admin === true) {
    next();
  } else {
    res.status(403).send("Access denied. Admin privileges required.");
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
};