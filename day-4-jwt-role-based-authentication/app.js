const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Welcome" });
});

let isAdminValue = false;
//Authenticated User endpoint
app.post("/api/users", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.json({ message: "Something wrong - userRoute" }).sendStatus(403);
    } else {
      if (isAdminValue === false) {
        res.json({ message: "User Access", authData, token: req.token });
      } else if (isAdminValue === true) {
        res.json({ message: "User Route is private" });
      } else {
        res.json({ message: "Something wrong - userRoute" }).sendStatus(500);
      }
    }
  });
});

//Authenticated Admin endpoint
app.post("/api/admin", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.json({ message: "Something wrong - adminRoute" }).sendStatus(403);
    } else {
      if (isAdminValue === true) {
        res.json({ message: "Admin Access", authData, token: req.token });
      } else if (isAdminValue === false) {
        res.json({ message: "Admin Route is private" });
      } else {
        res.json({ message: "Something wrong - adminRoute" }).sendStatus(500);
      }
    }
  });
});

app.post("/api/login", (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: "Krithika",
    email: "krithika@gmail.com",
    isAdmin: false,
  };

  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({ token: token });
    isAdminValue = user.isAdmin;
  });
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log("Server started"));
