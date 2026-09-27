const { dbConnection } = require("./../configs/db");
const { ObjectId } = require("mongodb");
const find = async () => {
  const db = await dbConnection();
  const booksCollection = db.collection("books");
  const books = booksCollection.find({}).toArray();
  return books;
};

const remove = async (bookID) => {
  const db = await dbConnection();
  const booksCollection = db.collection("books");
  const books = await booksCollection.find({}).toArray();
  const isBookID = books.some((book) => book._id.toString() === bookID);
  if (isBookID) {
    await booksCollection.deleteOne({ _id: new ObjectId(bookID) });
    return { message: "book remove successfully 📕" };
  } else {
    return { message: "no such book ❌" };
  }
};

const create = async (newBook) => {
  const db = await dbConnection();
  const booksCollection = db.collection("books");
  await booksCollection.insertOne(newBook);

  return { message: "new book added successfully 📗" };
};

const backTheBook = async (bookID) => {
  const db = await dbConnection();
  const booksCollection = db.collection("books");
  await booksCollection.updateOne(
    { _id: new ObjectId(bookID) },
    { $set: { free: 1 } },
  );

  return { message: "book back successfully 📚✅" };
};

const update = async (bookID, reqBody) => {
  const db = await dbConnection();
  const booksCollection = db.collection("books");
  const books = await booksCollection.find({}).toArray();
  const isBookID = books.some((book) => book._id.toString() === bookID);
  if (isBookID) {
    await booksCollection.updateOne(
      { _id: new ObjectId(bookID) },
      {
        $set: {
          title: reqBody.title,
          author: reqBody.author,
          price: reqBody.price,
        },
      },
    );
    return { message: "books updates successfully 📘" };
  } else {
    return { message: "no such book" };
  }
};

module.exports = {
  find,
  remove,
  create,
  backTheBook,
  update,
};
