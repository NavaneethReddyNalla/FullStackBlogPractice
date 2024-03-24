const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 4000;

// Connecting the database and assigning keys to the collections
const mongoClient = require("mongodb").MongoClient;
mongoClient
  .connect(process.env.DB_URL)
  .then((client) => {
    const dbObj = client.db("blogappdb");
    const usersCollection = dbObj.collection("users");
    const authorsCollection = dbObj.collection("authors");
    const articlesCollection = dbObj.collection("articles");
    app.set("usersCollection", usersCollection);
    app.set("authorsCollection", authorsCollection);
    app.set("articlesCollection", articlesCollection);
    console.log("Database connection established");
  })
  .catch((err) => console.log("Error connecting to Database " + err));

// Import apis
const userApp = require("./routes/user");
const adminApp = require("./routes/admin");
const authorApp = require("./routes/author");

// Define routes for APIs
app.use(express.json());
app.use("/user", userApp);
app.use("/admin", adminApp);
app.use("/author", authorApp);

// To host the react app
app.use(express.static(path.join(__dirname, "../frontend/build/")));

// Error handling middleware
app.use((err, req, res, next) => {
  res.send({ status: "Error", message: err.message });
});

app.listen(port, () => console.log(`Server live on http://localhost:${port}`));
