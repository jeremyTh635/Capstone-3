const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
const {jwtMiddleware} = require("./middleware/jwtMiddleware");
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server" });
});

const loginRoute = require("./routes/loginRoute");

// app.post("/login",  (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   res.send(req.body);
// });

loginRoute(app);

app.get("/search", jwtMiddleware, (req, res) => {
  const { term, entity } = req.query;

  axios.get(`https://itunes.apple.com/search?term=${term}&entity=${entity}`)
  .then(function (response)
  {
    console.log(response.data.results);
    res.send(response.data.results);
  })
  .catch((error) => res.status(500).send(error.message));
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});
