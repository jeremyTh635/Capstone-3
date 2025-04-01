const validUsers = require("./userDB");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = (req, res) => {
  const { username, password } = req.body;
  const user = validUsers.find(user =>
    user.username === username && user.password === password
  );
  if (!user) {
    return res.send("Incorrect user credentials");
  }
  payload = {
    "username": username,
    "password": password
  }
  const token = jwt.sign(JSON.stringify(payload), process.env.SECRET_SIGN, {
    algorithm: "HS256"
  });

  console.log(`User ${username} logged in`)
  res.send({ message: `Welcome ${username}`, token: token})
}

module.exports = {
  userController
};
