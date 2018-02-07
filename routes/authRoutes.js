const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyToken = require("../middleware/verifyToken");
const config = require("../config");
const User = mongoose.model("User");

module.exports = (app) => {

  // REGISTER USER
  app.post("/api/auth/register", (req, res) => {
    bcrypt.genSalt(6, (err, salt) => {
      bcrypt.hash(req.body.password , salt, (err, hashedPassword) => {
        User.create({
          name: req.body.name,
          email: req.body.email,
          hashedPassword: hashedPassword
        }, (err, user) => {
          if (err) return res.status(500).send("There was a problem to register user " + err.message);

          //create token
          const token = jwt.sign({ id: user._id }, config.secret,
              { expiresIn: config.accessTokenExpirationTime});

          res.status(200).send({auth: true, token: token});
        });
      })
    })
  });

  // LOGIN USER
  app.post("/api/auth/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send("Error on server");
      if (!user) return res.status(404).send("No user found");

      bcrypt.compare(req.body.password, user.hashedPassword, (err, result) => {
        if (err) return res.status(500).send("Error on server");
        if (!result) return res.status(401).send({auth: false, token: null});

        const token = jwt.sign({id: user._id}, config.secret,
            { expiresIn: config.accessTokenExpirationTime});

        res.status(200).send({ auth: true, token: token});
      })
    })
  });

  // LOGOUT
  /*
    logout is only client side functionality
    (deleting token from cookies or other browser storage)
   */

  // GET USER by token
  app.get("/api/auth/me", verifyToken, (req, res) => {
    res.status(200).send(req.user);
  })

};
