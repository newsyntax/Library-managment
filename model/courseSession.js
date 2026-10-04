const mongoose = require("mongoose");

const courseSessionSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  courseID: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  video: {
    type: String,
    require: true,
    default: "video.mp4",
  },
});

const courseSessionModel = mongoose.model("session", courseSessionSchema);

module.exports = { courseSessionModel, courseSessionSchema };
