const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { userOrAuthorLogin } = require("./util");
const adminApp = express.Router();

adminApp.post("/login", expressAsyncHandler(userOrAuthorLogin));

module.exports = adminApp;
