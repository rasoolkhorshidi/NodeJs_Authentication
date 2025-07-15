const express = require("express");
const app = express();
const router = require("./src/routes/index");
const mongoose = require("mongoose");
const debug = require("debug")("app:main");
const config = require("config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", router);

mongoose
  .connect(config.get("database.url"))
  .then(() => {
    debug("Connected to MongoDB");
  })
  .catch((err) => {
    debug("Error connecting to MongoDB:", err);
  });

app.listen(config.get("server.port"), () => {
  debug(`Server is running on port ${config.get("server.port")}`);
});
