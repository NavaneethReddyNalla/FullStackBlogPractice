const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Request handler for user/author registration
const createUserOrAuthor = async (req, res) => {
  // get users and authors collection object
  const usersCollection = req.app.get("usersCollection");
  const authorsCollection = req.app.get("authorsCollection");

  const user = req.body;

  if (user.userType === "user") {
    const dbuser = await usersCollection.findOne({ username: user.username });
    if (dbuser !== null) {
      return res.send({ message: "User already exists" });
    }
  }

  if (user.userType === "author") {
    const dbuser = await authorsCollection.findOne({ username: user.username });
    if (dbuser != null) {
      return res.send({ message: "Author already exists" });
    }
  }

  const hashedPassword = await bcryptjs.hash(user.password, 7);
  user.password = hashedPassword;

  if (user.userType === "user") {
    await usersCollection.insertOne(user);
    res.send({ message: "User created" });
  } else if (user.userType === "author") {
    await authorsCollection.insertOne(user);
    res.send({ message: "Author created" });
  }
};

const userOrAuthorLogin = async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  const authorsCollection = req.app.get("authorsCollection");

  const userCred = req.body;

  if (userCred.userType === "user") {
    const dbuser = await usersCollection.findOne({
      username: userCred.username,
    });
    if (dbuser === null) {
      return res.send({ message: "Invalid Username" });
    } else {
      const status = await bcryptjs.compare(userCred.password, dbuser.password);
      if (status === false) {
        return res.send({ message: "Invalid Password" });
      } else {
        const signedToken = jwt.sign({ username: dbuser.username }, "abcdef", {
          expiresIn: "1d",
        });

        delete dbuser.password;
        res.send({
          message: "login success",
          token: signedToken,
          user: dbuser,
        });
      }
    }
  }

  if (userCred.userType === "author") {
    const dbuser = await authorsCollection.findOne({
      username: userCred.username,
    });
    if (dbuser === null) {
      return res.send({ message: "Invalid Author name" });
    } else {
      const status = await bcryptjs.compare(userCred.password, dbuser.password);
      if (status === false) {
        return res.send({ message: "Invalid Password" });
      } else {
        const signedToken = jwt.sign({ username: dbuser.username }, "abcdef", {
          expiresIn: "1d",
        });

        delete dbuser.password;
        res.send({
          message: "login success",
          token: signedToken,
          user: dbuser,
        });
      }
    }
  }
};

module.exports = { createUserOrAuthor, userOrAuthorLogin };
