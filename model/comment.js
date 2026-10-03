const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  body: {
    type: String,
    require: true,
  },
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = { commentModel, commentSchema };
