const express = require("express");
const usersRouter = require("./routes/usersRouter");
const booksRouter = require("./routes/booksRouter");
const rentsRouter = require("./routes/rentsRouter");
require("dotenv").config();
const app = express();
require("./configs/db");
app.use(express.json());
app.use("/api/users/", usersRouter);
app.use("/api/books/", booksRouter);
app.use("/api/rent", rentsRouter);
app.listen(process.env.PORT, () => {
  console.log(`Node.js server ${process.env.PORT} 🟢`);
});
