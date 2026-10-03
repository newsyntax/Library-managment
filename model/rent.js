const mongoose = require("mongoose");

const rentBookSchema = mongoose.Schema({
  bookID: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
});

const rentBooksModel = mongoose.model("rent", rentBookSchema);

module.exports = rentBooksModel;
