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
});

courseSchema.virtual("comments", {
  ref: "comments",
  localField: "_id",
  foreignField: "courseID",
});
const courseModel = mongoose.model("couses", courseSchema);

module.exports = { courseModel, courseSchema };
