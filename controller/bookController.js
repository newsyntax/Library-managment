// const url = require("url");
const { booksModel, booksSchema } = require("./../model/book");

const getAll = async (req, res) => {
  const books = await booksModel.find({});
  res.status(200).json(books);
};

const createBook = async (req, res) => {
  const { title, author, price } = req.body;
  await booksModel.create({
    title,
    author,
    price,
  });
  res.status(201).json({ message: "book created successfully" });
};

const updateBook = async (req, res) => {
  const { title, author, price, id } = req.body;

  await booksModel.updateOne(
    { _id: id },
    {
      $set: {
        title,
        author,
        price,
      },
    },
  );
  res.status(200).json({ message: "book updated successfuly" });
};

const removeBooK = async (req, res) => {
  const { id } = req.body;

  await booksModel.deleteOne({ _id: id });
  res.status(200).json({ message: "book remove successsfully" });
};

const back = async (req, res) => {
  const { id } = req.body;
  await booksModel.updateOne({ _id: id }, { $set: { free: 1 } });
  res.status(200).json({ message: "books backed successfully" });
};

module.exports = {
  getAll,
  removeBooK,
  createBook,
  updateBook,
  back,
};
