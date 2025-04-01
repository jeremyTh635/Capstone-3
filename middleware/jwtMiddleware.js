const jwt = require("jsonwebtoken");
require("dotenv").config();


function jwtMiddleware(req, res, next) {
  const jwtToken = req.headers["authorization"]

  const tokenExtract = jwtToken.split(' ')[1]

  try {
    const payload = jwt.verify(tokenExtract, process.env.SECRET_SIGN);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token"});
  }
}

module.exports = {
  jwtMiddleware
};
