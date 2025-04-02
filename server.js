// Imports to create server functionality
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const {jwtMiddleware} = require("./middleware/jwtMiddleware");
// Define app and port for backend
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Import login route
const loginRoute = require("./routes/loginRoute");
loginRoute(app);

// Get search parameters from client side
app.get("/search", jwtMiddleware, (req, res) => {
  const { term, entity } = req.query;

  // Call iTunes api with search parameters
  axios.get(`https://itunes.apple.com/search?term=${term}&entity=${entity}`)
  .then(function (response)
  {
    console.log(response.data.results);
   // Send response to client
    res.send(response.data.results);
  })
  .catch((error) => res.status(500).send(error.message));
});

// Activate backend port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});
