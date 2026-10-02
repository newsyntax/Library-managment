const express = require("express");
const usersRouter = require("./routes/usersRouter");
require("dotenv").config();
const app = express();
require("./configs/db")
app.use(express.json())
app.use("/api/users/", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`Node.js server ${process.env.PORT} 🟢`);
  
})