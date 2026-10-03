const { courseModel } = require("./../model/course");
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
  const courses = await courseModel.find({}).populate("teacher").populate("comments");
  res.status(200).json(courses);
};

exports.addCommnet = async (req, res) => {
  const { body, courseID } = req.body;
  const comment = await commentModel.create({ body });

  await courseModel.updateOne(
    { _id: courseID.toString() },
    { $push: { comments: comment._id } },
  );

  res.status(201).json({ message: "comment set successfully ✅" });
};
