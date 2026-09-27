const { dbConnection } = require("./../configs/db");
const { ObjectId } = require("mongodb");

const rentBook = async (reqBody) => {
  const db = await dbConnection();
  const rentsCollection = db.collection("rents");
  const booksCollection = db.collection("books");
  const books = await booksCollection.find({}).toArray();
  const { bookID, userID } = JSON.parse(reqBody);
  const isBookFree = books.some((book) => {
    if (book._id.toString() === bookID) {
      return book.free === 1;
    }
  });

  if (isBookFree) {
    await booksCollection.updateOne(
      { _id: new ObjectId(bookID) },
      { $set: { free: 0 } },
    );

    await rentsCollection.insertOne({
      userID: userID,
      bookID: bookID,
    });

    return { message: "book reserved successfully 🔖✅" };
  } else {
    return { message: "book is not free" };
  }
};

module.exports = {
  rentBook,
};
