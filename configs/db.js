const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.dbConnectionURL)
  .then(console.log("MongoDB 🧡"))
  .catch(error => console.log(error)
  )
