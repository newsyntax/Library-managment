const http = require("http");
require("dotenv").config();

const bookController = require("./controller/bookController");
const userController = require("./controller/userController");
const rentController = require("./controller/rentController");
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/users") {
    userController.getAll(req, res);
  } else if (req.method === "GET" && req.url === "/api/books") {
    bookController.getAll(req, res);
  } else if (req.method === "DELETE" && req.url.startsWith("/api/books")) {
    bookController.removeOne(req, res);
  } else if (req.method === "POST" && req.url === "/api/books") {
    bookController.createBook(req, res);
  } else if (req.method === "PUT" && req.url.startsWith("/api/books/back")) {
    bookController.back(req, res);
  } else if (req.method === "PUT" && req.url.startsWith("/api/books")) {
    bookController.updateBook(req, res);
  } else if (req.method === "POST" && req.url === "/api/users") {
    userController.createUser(req, res);
  } else if (req.method === "PUT" && req.url.startsWith("/api/users/upgrade")) {
    userController.upgradeUser(req, res);
  } else if (req.method === "PUT" && req.url.startsWith("/api/users")) {
    userController.crimeUser(req, res);
  } else if (req.method === "POST" && req.url === "/api/users/login") {
    userController.loginUser(req, res);
  } else if (req.method === "POST" && req.url === "/api/books/rent") {
    rentController.rentBook(req, res);
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} 🟢`);
});
