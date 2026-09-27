const { dbConnection } = require("./../configs/db");
const { ObjectId } = require("mongodb");

const find = async () => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const users = usersCollection.find({}).toArray();
  return users;
};

const isUserExistHandler = async (user) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const users = await usersCollection.find({}).toArray();
  const { username, email } = JSON.parse(user);
  const isUserExist = users.some(
    (user) => user.username === username || user.email === email,
  );

  return isUserExist;
};
const create = async (newUser) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const createdUser = await usersCollection.insertOne(newUser);
  if (createdUser) {
    return { message: "user added successfully 👤✅" };
  } else {
    return new Error("ooops!!! an error eccord");
  }
};

const upgrage = async (userID) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const users = await usersCollection.find({}).toArray();
  const isUser = users.some((user) => user._id.toString() === userID);

  if (isUser) {
    await usersCollection.updateOne(
      { _id: new ObjectId(userID) },
      { $set: { role: "ADMIN" } },
    );

    return { message: "user upgrade successfully 👑✅" };
  } else {
    return { message: "no user exist" };
  }
};

const crime = async (userID, user) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const users = await usersCollection.find({}).toArray();
  const isUser = users.some((user) => user._id.toString() === userID);

  if (isUser) {
    const { crime } = JSON.parse(user);
    await usersCollection.updateOne(
      { _id: new ObjectId(userID) },
      { $set: { crime: crime } },
    );

    return {
      message: "user crime updated successfully 💸✅",
    };
  } else {
    return { message: "user not found" };
  }
};

const login = async (reqBody) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const users = await usersCollection.find({}).toArray();

  const { email, username } = JSON.parse(reqBody);
  const user = users.find(
    (user) => user.email === email && user.username === username,
  );

  if (user) {
    return { username: user.username, email: user.email };
  } else {
    return { message: "access denaid" };
  }
};

module.exports = {
  find,
  create,
  isUserExistHandler,
  upgrage,
  crime,
  login,
};
