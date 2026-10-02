const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  fullname: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
    default: "USER"
  },
  crime: {
    type: Number,
    require: true,
    default: 0
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
