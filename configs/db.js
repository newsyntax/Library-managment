const { MongoClient } = require("mongodb");
const url = process.env.dbConnectionURL;
const dbConnection = new MongoClient(url);
const dbName = process.env.dbName;

module.exports = {
  dbConnection: async () => {
    await dbConnection.connect();
    console.log("MongoDB connected 🥭");
    const db = dbConnection.db(dbName);

    return db;
  },
};
