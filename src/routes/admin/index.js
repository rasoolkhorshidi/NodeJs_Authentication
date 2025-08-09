const express = require("express");
const userRouter = express.Router();
const controller = require("./controller");

userRouter.get("/", controller.dashboard);
userRouter.get("/me", controller.me);

module.exports = userRouter;
