const url = require("url");
const BookModel = require("./../model/book");

const getAll = async (req, res) => {
  const books = await BookModel.find();
  res.writeHead(200, { "content-type": "application/json" });
  res.write(JSON.stringify(books));
  res.end();
};

const removeOne = async (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const bookID = parsedURL.query.id;

  const removedBook = await BookModel.remove(bookID);
  res.writeHead(200, { "content-type": "application/json" });
  res.write(JSON.stringify(removedBook));
  res.end();
};

const createBook = async (req, res) => {
  let book = "";
  req.on("data", (data) => {
    book = book + data.toString();
  });

  req.on("end", async () => {
    const { title, author, price } = JSON.parse(book);
    if (title === "" || author === "" || price < 0) {
      res.writeHead(402, { "content-type": "application/json" });
      res.write(JSON.stringify({ message: "invalid data" }));
      res.end();
    }
    const newBook = { ...JSON.parse(book), free: 1 };
    const createdBook = await BookModel.create(newBook);

    res.writeHead(201, { "content-type": "application/json" });
    res.write(JSON.stringify(createdBook));
    res.end();
  });
};

const back = async (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const bookID = parsedURL.query.id;

  const backedBook = await BookModel.backTheBook(bookID);
  res.writeHead(200, { "content-type": "application/json" });
  res.write(JSON.stringify(backedBook));
  res.end();
};

const updateBook = async (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const bookID = parsedURL.query.id;

  let bookUpdatedInfo = "";
  req.on("data", (data) => {
    bookUpdatedInfo = bookUpdatedInfo + data.toString();
  });
  req.on("end", async () => {
    const reqBody = JSON.parse(bookUpdatedInfo);
    const updatedBook = await BookModel.update(bookID, reqBody);

    res.writeHead(200, { "content-type": "application/json" });
    res.write(JSON.stringify(updatedBook));
    res.end();
  });
};

module.exports = {
  getAll,
  removeOne,
  createBook,
  back,
  updateBook,
};
