const express = require("express");
const userApp = express.Router();

const { createUserOrAuthor, userOrAuthorLogin } = require("./util");
const expressAsyncHandler = require("express-async-handler");

// User Creation
userApp.post("/user", expressAsyncHandler(createUserOrAuthor));

// User Login
userApp.post("/login", expressAsyncHandler(userOrAuthorLogin));

module.exports = userApp;
