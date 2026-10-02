const express = require("express");
const userController = require("./../controller/userController");
const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(userController.getAll)
  .post(userController.createUser);
usersRouter.route("/:id").put(userController.upgradeToAdmin);
module.exports = usersRouter;
