// Required files for controller functionality
const validUsers = require("./userDB");
const jwt = require("jsonwebtoken");
// Require dotenv for signature
require("dotenv").config();

// Code to validate and accept login
const userController = (req, res) => {
  const { username, password } = req.body;

  // Find user in database
  const user = validUsers.find(user =>
    user.username === username && user.password === password
  );

  // Return error message if user not found
  if (!user) {
    return res.send("Incorrect user credentials");
  }

  // Generate json web token payload
  payload = {
    "username": username,
    "password": password
  }

  // Create and sign jwt
  const token = jwt.sign(JSON.stringify(payload), process.env.SECRET_SIGN, {
    algorithm: "HS256"
  });

  // Messages to client to confirm successful login and token generation
  console.log(`User ${username} logged in`)
  res.send({ message: `Welcome ${username}`, token: token})
}

// Export controller for use elsewhere in app
module.exports = {
  userController
};
