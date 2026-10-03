const express = require("express");
const teacherController = require("./../controller/teacherController");

const teachersRouter = express.Router();

teachersRouter
  .route("/")
  .post(teacherController.addTeacher)
  .get(teacherController.getAll);

module.exports = teachersRouter;
