const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const config = require("../config");

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) return res.status(401).send({auth: false,
    message: "No token provided"});

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false,
      message: "Failed to authenticate token."});

    User.findById(decoded.id, (err, user) => {
      if (err) return res.status(500).send("There was a problem finding the user");
      if (!user) return res.status(404).send("No user found.");

      req.user = user;
      next();
    })
  })
};
