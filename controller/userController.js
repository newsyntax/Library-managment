const UserModel = require("./../model/user");
const url = require("url");

const getAll = async (req, res) => {
  const users = await UserModel.find();

  res.writeHead(200, { "content-type": "application/json" });
  res.write(JSON.stringify(users));
  res.end();
};

const createUser = async (req, res) => {
  let user = "";
  req.on("data", (data) => {
    user = user + data.toString();
  });
  req.on("end", async () => {
    const { username, name, email } = JSON.parse(user);
    const isUserExist = await UserModel.isUserExistHandler(user);
    if (username === "" || name === "" || email === "") {
      //invalid information
      res.writeHead(422, { "content-type": "application/json" });
      res.write(JSON.stringify({ message: "invalid information" }));
      res.end();
    } else if (isUserExist) {
      //user exisist
      res.writeHead(409, { "content-type": "application/json" });
      res.write(JSON.stringify({ message: "username or email alreadi exist" }));
      res.end();
    } else {
      const newUser = {
        username,
        name,
        email,
        crime: 0,
        role: "USER",
      };
      //create user
      const createdUser = await UserModel.create(newUser);

      res.writeHead(201, { "content-type": "application/json" });
      res.write(JSON.stringify(createdUser));
      res.end();
    }
  });
};

const upgradeUser = async (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const userID = parsedURL.query.id;
  const upgradedUser = await UserModel.upgrage(userID);
  res.writeHead(200, { "content-type": "application/json" });
  res.write(JSON.stringify(upgradedUser));
  res.end();
};

const crimeUser = async (req, res) => {
  const parsedURL = url.parse(req.url, true);
  const userID = parsedURL.query.id;
  let user = "";
  req.on("data", (data) => {
    user = user + data.toString();
  });
  req.on("end", async () => {
    const crimedUser = await UserModel.crime(userID, user);
    res.writeHead(200, { "content-type": "application/json" });
    res.write(JSON.stringify(crimedUser));
    res.end();
  });
};

const loginUser = async (req, res) => {
  let reqBody = "";
  req.on("data", (data) => {
    reqBody = reqBody + data.toString();
  });

  req.on("end", async () => {
    const logedInUser = await UserModel.login(reqBody);
    res.writeHead(200, { "content-type": "application/json" });
    res.write(JSON.stringify(logedInUser));
    res.end();
  });
};

module.exports = {
  getAll,
  createUser,
  upgradeUser,
  crimeUser,
  loginUser,
};
