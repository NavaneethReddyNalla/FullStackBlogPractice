const express = require("express");
const authorApp = express.Router();
const expressAsyncHandler = require("express-async-handler");

const { createUserOrAuthor, userOrAuthorLogin } = require("./util");

let authorsCollection, articlesCollection;

authorApp.use((req, res, next) => {
  authorsCollection = req.app.get("authorsCollection");
  articlesCollection = req.app.get("articlesCollection");
  next();
});

authorApp.post("/user", createUserOrAuthor);
authorApp.post("/login", userOrAuthorLogin);

// Creating the Article
authorApp.post(
  "/new-article",
  expressAsyncHandler(async (req, res) => {
    await articlesCollection.insertOne(req.body);
    res.send({ message: "Article added" });
  })
);

// Viewing the article
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

// Editing the article
authorApp.put(
  "/article",
  expressAsyncHandler(async (req, res) => {
    const modifiedArticle = req.body;

    await articlesCollection.updateOne(
      { articleId: modifiedArticle.articleId },
      { $set: { ...modifiedArticle } }
    );

    res.send({ message: "Article Modified" });
  })
);

// Soft deleting the article
authorApp.delete(
  "/article/:articleId",
  expressAsyncHandler(async (req, res) => {
    const articleId = req.params.articleId;
    await articlesCollection.updateOne(
      { articleId: articleId },
      { $set: { status: false } }
    );

    res.send({ message: "Article Deleted" });
  })
);

module.exports = authorApp;
