const express = require("express");
const userController = require("./../controller/userController");
const isUserExists = require("../middleware/isUserExists");
const usersRouter = express.Router();

usersRouter.route("/").get(userController.getAll);
usersRouter
  .route("/:id")
  .put(isUserExists, userController.upgradeToAdmin)
  .delete(isUserExists, userController.removeUser);
usersRouter.route("/login").post(userController.loginUser);
usersRouter.route("/register").post(userController.createUser);
usersRouter.route("/crime/:id").put(isUserExists, userController.crimeUser);
module.exports = usersRouter;
