const express = require("express");
const authorApp = express.Router();
const expressAsyncHandler = require("express-async-handler");

const { createUserOrAuthor, userOrAuthorLogin } = require("./util");

authorApp.use((req, res, next) => {
  authorsCollection = req.app.get("authorsCollection");
  articlesCollection = req.app.get("articlesCollection");
  next();
});

authorApp.post("/user", createUserOrAuthor);
authorApp.post("/login", userOrAuthorLogin);
authorApp.post(
  "/new-article",
  expressAsyncHandler(async (req, res) => {
    await articlesCollection.insertOne(req.body);
    res.send({ message: "Article added" });
  })
);

authorApp.get(
  "/articles/:username",
  expressAsyncHandler(async (req, res) => {
    const usernameOfAuthor = req.params.username;

    const articleLlist = await articlesCollection
      .find({ username: userOrAuthorLogin })
      .toArray();

    res.send({ message: "Articles", payload: articleLlist });
  })
);

module.exports = authorApp;
