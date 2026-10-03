const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
});

const teacherModel = mongoose.model("teacher", teacherSchema);

module.exports = { teacherModel };
