const { booksModel } = require("./../model/book");

module.exports = async (req, res, next) => {
  const { id } = req.body;
  const books = await booksModel.find({});
  const isBook = books.some((book) => book._id.toString() === id);

  if (isBook) {
    return next();
  } else {
    res.status(404).json({ message: "no suhc book" });
  }
};
