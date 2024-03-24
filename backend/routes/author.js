const express = require("express");
const authorApp = express.Router();
const expressAsyncHandler = require("express-async-handler");

const { createUserOrAuthor, userOrAuthorLogin } = require("./util");
const verifyToken = require("../middlewares/verifyToken");

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
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    await articlesCollection.insertOne(req.body);
    res.send({ message: "Article added" });
  })
);

// Viewing the article
authorApp.get(
  "/articles/:username",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const usernameOfAuthor = req.params.username;

    const articleLlist = await articlesCollection
      .find({ username: usernameOfAuthor, status: true })
      .toArray();

    res.send({ message: "Articles", payload: articleLlist });
  })
);

// Editing the article
authorApp.put(
  "/article",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const modifiedArticle = req.body;
    delete modifiedArticle._id;

    const article = await articlesCollection.findOneAndUpdate(
      { articleId: modifiedArticle.articleId },
      { $set: { ...modifiedArticle } },
      { returnDocument: "after" }
    );

    res.send({ message: "Article Modified", payload: article });
  })
);

// Soft deleting the article
authorApp.delete(
  "/article/:articleId",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const articleId = +req.params.articleId;
    await articlesCollection.updateOne(
      { articleId: articleId },
      { $set: { status: false } }
    );

    res.send({ message: "Article Deleted" });
  })
);

module.exports = authorApp;
