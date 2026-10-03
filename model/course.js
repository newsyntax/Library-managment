const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "teacher",
    require: true,
  },
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment", require: true }],
});

const courseModel = mongoose.model("couses", courseSchema);

module.exports = { courseModel, courseSchema };
