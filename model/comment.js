const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  body: {
    type: String,
    require: true,
  },
  courseID: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "courses",
  },
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = { commentModel, commentSchema };
