module.exports = {
  dashboard: async (req, res) => {
    res.send("user dashboard");
  },

  me: async (req, res) => {
    res.send(req.user);
  },
};
