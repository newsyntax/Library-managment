const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.dbConnectionURL)
  .then(console.log("MongoDB 🧡"))
  .catch(console.log((error) => console.log(error)));
