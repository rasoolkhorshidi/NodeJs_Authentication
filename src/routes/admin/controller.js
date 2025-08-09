module.exports = {
  dashboard: async (req, res) => {
    res.send("admin dashboard");
  },
  me: async (req, res) => {
    res.send("User profile endpoint");
  },
};
