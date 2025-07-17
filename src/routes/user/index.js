const express = require("express");
const authRouter = express.Router();
const controller = require("./controller");
const validator = require("./validator");

authRouter.post("/", controller.dashboard);
authRouter.post("/me", controller.me);

module.exports = authRouter;
