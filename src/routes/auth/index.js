const express = require("express");
const authRouter = express.Router();
const controller = require("./controller");
const validator = require("./validator");

authRouter.post("/login" || "/loginadmin", validator.validateLogin, controller.login);
authRouter.post("/register", validator.validateRegister, controller.register);
authRouter.post("/logout", validator.validateLogout, controller.logout);

module.exports = authRouter;
