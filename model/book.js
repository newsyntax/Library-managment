const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  free: {
    type: Number,
    require: true,
    default: 1,
  },
});

const booksModel = mongoose.model("Books", booksSchema);

module.exports = { booksModel, booksSchema };
