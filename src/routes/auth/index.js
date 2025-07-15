const express = require("express");
const authRouter = express.Router();
const controller = require("./controller");

authRouter.post("/login", controller.login);
authRouter.post("/register", controller.register);
authRouter.post("/logout", controller.logout);

module.exports = authRouter;
