const mongoose = require("mongoose");
const { User } = require("../../models/user"); // Assuming you have a User model
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    try {
      // Simulate user authentication logic
      const { username, password } = req.body;
      if (username && password) {
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        } else if (await bcrypt.compare(password, user.password)) {
          // Simulate token generation
          const token = jwt.sign(
            { _id: user.id },
            config.get("security.jwtSecret")
          );
          return res.status(200).json({
            message: "Login successful",
            token,
            user: {
              username: user.username,
              email: user.email,
              createdAt: user.createdAt,
            },
          });
        } else if (!(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ message: "Invalid password" });
        }
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      // Simulate user logout logic
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  register: async (req, res) => {
    try {
      // Simulate user registration logic
      const { username, password, email, admin } = req.body;
      if (username && password && email) {
        const checkExistingEmail = await User.findOne({ email });
        const checkExistingUsername = await User.findOne({ username });
        if (checkExistingEmail) {
          return res.status(400).json({ message: "Email already exists" });
        } else if (checkExistingUsername) {
          return res.status(400).json({ message: "Username already exists" });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          if (admin === "true" || admin === true) {
            // If admin is true, set admin role
            const newUser = new User({
              username,
              password: hashedPassword,
              email,
              admin: true,
            });
            await newUser.save();
            return res.status(201).json({
              message: "Admin registration successful",
              username,
              email,
            });
          } else {
            // If admin is false or not provided, set regular user role
            const newUser = new User({
              username,
              password: hashedPassword,
              email,
            });

            await newUser.save();
            return res
              .status(201)
              .json({ message: "Registration successful", username, email });
          }
        }
      } else {
        return res
          .status(400)
          .json({ message: "Username and password and email are required" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
};
