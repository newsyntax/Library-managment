const { courseModel, courseSchema } = require("./../model/course");
const { commentModel } = require("./../model/comment");
const fs = require("fs");
const { courseSessionModel } = require("../model/courseSession");
exports.createCourse = async (req, res) => {
  const { title, teacherID } = req.body;
  await courseModel.create({
    title,
    teacher: teacherID,
  });

  fs.mkdir(title, (error) => {
    if (error) {
      throw error;
    }
    res.status(201).json({ message: "course created ✅" });
  });
};

exports.getAll = async (req, res) => {
  const courses = await courseModel
    .find({})
    .populate("teacher", "-__v -_id")
    .select("-__v -_id");

  res.status(200).json(courses);
};

exports.getOne = async (req, res) => {
  const { title } = req.params;
  const course = await courseModel.findOne({ title });
  const comments = await commentModel.find({ courseID: course._id });
  const sessions = await courseSessionModel.find(
    { courseID: course._id },
    "-__v -_id  -courseID",
  );

  res.status(200).json({ course, comments, sessions });
};

exports.addCommnet = async (req, res) => {
  const { body, courseID } = req.body;
  await commentModel.create({ body, courseID });

  res.status(201).json({ message: "comment set successfully ✅" });
};

exports.addSession = async (req, res) => {
  const { courseID, title, time } = req.body;
  await courseSessionModel.create({
    title,
    time,
    courseID,
  });
  res.status(201).json({ message: "session added" });
};
