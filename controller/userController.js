const isUserExists = require("../middleware/isUserExists");
const userModel = require("./../model/user");
const url = require("url");

exports.getAll = async (req, res) => {
  const allUsers = await userModel.find({}, "-__v");
  res.status(200).json(allUsers);
};

exports.createUser = async (req, res) => {
  const { username, email, fullname } = req.body;
  await userModel.create({
    email,
    username,
    fullname,
  });
  res.status(201).send({ message: "user create success fully" });
};

exports.upgradeToAdmin = async (req, res) => {
  await userModel.updateOne({ _id: req.params.id }, { role: "ADMIN" });

  res.status(200).json({ message: "user upgraded" });
};

exports.loginUser = async (req, res) => {
  const { username, email } = req.body;
  const allUser = await userModel.find({});
  const isCorrenctInfo = allUser.some(
    (user) => user.email === email && user.username === username,
  );
  if (isCorrenctInfo) {
    res.status(200).send({ message: "welcome to your pannel" });
  } else {
    res.status(403).send({ message: "access denied" });
  }
};

exports.crimeUser = async (req, res) => {
  const { id } = req.params;
  const { crime } = req.body;
  await userModel.updateOne({ _id: id.toString() }, { $set: { crime: crime } });
  res.status(200).json({ message: "user crimed successfully" });
};

exports.removeUser = async (req, res) => {
  const { id } = req.params;
  await userModel.deleteOne({ _id: id });
  res.status(200).json({ message: "user successfully deleted" });
};
