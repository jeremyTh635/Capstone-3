const { userController } = require("../controllers/userController");

const loginRoute = (app) => {
  app.post("/login", userController);
};

module.exports = loginRoute;
