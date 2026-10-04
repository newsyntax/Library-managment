const { courseModel, courseSchema } = require("./../model/course");
const { commentModel } = require("./../model/comment");
exports.createCourse = async (req, res) => {
  const { title, teacherID } = req.body;
  await courseModel.create({
    title,
    teacher: teacherID,
  });

  res.status(201).json({ message: "course created ✅" });
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

  res.status(200).json({ course, comments });
};

exports.addCommnet = async (req, res) => {
  const { body, courseID } = req.body;
  const comment = await commentModel.create({ body, courseID });

  await courseModel.updateOne(
    { _id: courseID.toString() },
    { $push: { comments: comment._id } },
  );

  res.status(201).json({ message: "comment set successfully ✅" });
};
