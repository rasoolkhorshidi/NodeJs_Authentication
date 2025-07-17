const express = require("express");
const app = express();
const router = require("./src/routes/index");
const mongoose = require("mongoose");
const debug = require("debug")("app:main");
const config = require("config");
const { User } = require("./src/routes/models/user"); // Assuming you have a User model

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
mongoose
  .connect(config.get("database.url"))
  .then(() => {
    debug("Connected to MongoDB");
  })
  .catch((err) => {
    debug("Error connecting to MongoDB:", err);
  });

app.use("/api", router);

app.get("/", (req, res) => {
  // async function to show all users
  async function showUsers() {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching users", error: error.message });
    }
  }
  showUsers();
});

app.listen(config.get("server.port"), () => {
  debug(`Server is running on port ${config.get("server.port")}`);
});
