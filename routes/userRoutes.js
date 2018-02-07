const mongoose = require("mongoose");

const User =  mongoose.model("User");

module.exports = (app) => {
  // CREATE NEW USER
  app.post("/users", (req, res) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }, (err, user) => {
      if (err) return res.status(500).send("There was problem adding new user to database");
      res.status(200).send(user);
    })
  });

  // GET ALL USERS
  app.get("/users", (req, res) => {
    User.find({}, (err, users) => {
      if (err) return res.status(500).send("There was problem finding all users");
      res.status(200).send(users);
    })
  });

  // GET USER BY ID
  app.get("/users/:id", (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) return res.status(500).send("There was problem finding user by id");
      if (!user) return res.status(404).send("No user found");
      res.status(200).send(user);
    });
  });

  // DELETE USER
  app.delete("/users/:id", (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
      if (err) return res.status(500).send("There was problem deleting the user");
      res.status(200).send("User: "+ deletedUser.name + " was deleted");
    })
  });

  // UPDATE USER
  app.put("/users/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
      if (err) return res.status(500).send("There was problem updating the user");
      res.status(200).send(updatedUser);
    })
  });
};










