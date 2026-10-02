const userModel = require("./../model/user");
const url = require("url");

exports.getAll = async (req, res) => {
  const allUsers = await userModel.find({});
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
