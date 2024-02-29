const express = require("express");
const userApp = express.Router();

const { createUserOrAuthor, userOrAuthorLogin } = require("./util");
const expressAsyncHandler = require("express-async-handler");

let usersCollection;
let articlesCollection;

userApp.use((req, res, next) => {
  usersCollection = req.app.get("usersCollection");
  articlesCollection = req.app.get("articlesCollection");
  next();
});

// User Creation
userApp.post("/user", expressAsyncHandler(createUserOrAuthor));

// User Login
userApp.post("/login", expressAsyncHandler(userOrAuthorLogin));

// Get all articles
userApp.get(
  "/articles",
  expressAsyncHandler(async (req, res) => {
    const articlesList = await articlesCollection
      .find({ status: true })
      .toArray();
    res.send({ message: "All Articles", payload: articlesList });
  })
);

module.exports = userApp;
