const express = require("express");
const bookControllere = require("./../controller/bookController");
const isBookExists = require("./../middleware/isBookExists");

const booksRouter = express.Router();

booksRouter
  .route("/")
  .get(bookControllere.getAll)
  .post(bookControllere.createBook)
  .put(isBookExists, bookControllere.updateBook)
  .delete(isBookExists, bookControllere.removeBooK);
booksRouter.route("/back").put(isBookExists, bookControllere.back);
module.exports = booksRouter;
