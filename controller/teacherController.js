const { teacherModel } = require("./../model/teacher");

exports.getAll = async (req, res) => {
  const teachers = await teacherModel.find({});
  res.status(200).json(teachers);
};

exports.addTeacher = async (req, res) => {
  const { fullname, email, username } = req.body;
  await teacherModel.create({
    fullname,
    email,
    username,
  });
  res.status(201).json({ message: "teacher created ✅" });
};
