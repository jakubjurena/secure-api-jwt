const mongoose = require("mongoose");
const _ = require("lodash");
const {Schema} = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  hashedPassword: String,
  password: String
});

// method hiding some Schema fields while sending model of this schema to user
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ["_id", "name", "email"]);
};

mongoose.model("User", userSchema);
