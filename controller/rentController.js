const rentBooksModel = require("./../model/rent");
const {booksModel} = require("./../model/book");
const rentBook = async (req, res) => {
  const { bookID, userID } = req.body;
  await booksModel.updateOne({ _id: bookID }, { $set: { free: 0 } });
  await rentBooksModel.create({
    bookID,
    userID,
  });
  res.status(201).json({ message: "book rents successfully" });
};

module.exports = {
  rentBook,
};
