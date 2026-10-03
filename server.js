const express = require("express");
const usersRouter = require("./routes/usersRouter");
const booksRouter = require("./routes/booksRouter");
const rentsRouter = require("./routes/rentsRouter");
const teachersRouter = require("./routes/teachersRouter");
require("dotenv").config();
const app = express();
require("./configs/db");
app.use(express.json());
app.use("/api/users/", usersRouter);
app.use("/api/books/", booksRouter);
app.use("/api/rent", rentsRouter);
app.use("/api/teachers", teachersRouter);
app.listen(process.env.PORT, () => {
  console.log(`Node.js server ${process.env.PORT} 🟢`);
});
