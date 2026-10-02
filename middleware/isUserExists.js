const userModel = require("../model/user");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  const allUsers = await userModel.find({});
  const isUser = allUsers.some((user) => user._id.toString() === id);
  if (isUser) {
    return next();
  } else {
    res.status(404).json({ message: "no such user" });
  }
};
