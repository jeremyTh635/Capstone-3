// Necessary imports
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Define middleware function to secure api
function jwtMiddleware(req, res, next) {
  // Get token from request headers
  const jwtToken = req.headers["authorization"]
  // Split token from bearer
  const tokenExtract = jwtToken.split(' ')[1];

  try {
    // verify token
    const payload = jwt.verify(tokenExtract, process.env.SECRET_SIGN);
    req.payload = payload;
    next();
  } catch (error) {
    // Message if verification fails
    res.status(403).json({ message: "Invalid token"});
  }
}

// Export middleware to protect search route
module.exports = {
  jwtMiddleware
};
