const express = require("express");
const userApp = express.Router();

const { createUserOrAuthor, userOrAuthorLogin } = require("./util");

// User Creation
userApp.post("/user", createUserOrAuthor);

// User Login
userApp.post("/login", userOrAuthorLogin);

module.exports = userApp;
