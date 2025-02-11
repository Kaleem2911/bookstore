const jwt = require("jsonwebtoken");

const Authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ message: "Authentication token require" });
  }
  jwt.verify(token, process.env.SECREAT_KEY, (err, users) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token  expried .Please Signin again" });
    }
    req.users = users;
    next();

  });
};

module.exports = { Authentication };
