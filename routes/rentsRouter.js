const express = require("express");
const rentController = require("./../controller/rentController");

const rentsRouter = express.Router();
rentsRouter.route("/").post(rentController.rentBook);

module.exports = rentsRouter;
