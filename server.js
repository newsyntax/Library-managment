const express = require("express");
const usersRouter = require("./routes/usersRouter");
const booksRouter = require("./routes/booksRouter");
const rentsRouter = require("./routes/rentsRouter");
const teachersRouter = require("./routes/teachersRouter");
const coursesRouter = require("./routes/coursesRouter");
const uploader = require("./middleware/multer");
require("dotenv").config();
const app = express();
require("./configs/db");
app.use(express.json());
app.use("/api/users/", usersRouter);
app.use("/api/books/", booksRouter);
app.use("/api/rent", rentsRouter);
app.use("/api/teachers", teachersRouter);
app.use("/api/courses", coursesRouter);

app.get("/upload", uploader.array("file", 3), async (req, res) => {
  res.status(200).json({ message: "file uploaded !!!" });
});

app.use((error, res, req, next) => {
  return res.json({
    statusCode: error.status || 500,
    message: error.message || "enternal error",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Node.js server ${process.env.PORT} 🟢`);
});
