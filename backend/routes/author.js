const express = require("express");
const authorApp = express.Router();

const { createUserOrAuthor, userOrAuthorLogin } = require("./util");

authorApp.post("/user", createUserOrAuthor);
authorApp.post("/login", userOrAuthorLogin);

module.exports = authorApp;
