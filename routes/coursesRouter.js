const express = require("express");
const courseController = require("./../controller/courseController");
const coursesRouter = express.Router();

coursesRouter
  .route("/")
  .post(courseController.createCourse)
  .get(courseController.getAll);

coursesRouter.route("/:title").get(courseController.getOne);
coursesRouter.route("/comment").post(courseController.addCommnet);

module.exports = coursesRouter;
