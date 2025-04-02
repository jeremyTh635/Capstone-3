// Require userController to process login
const { userController } = require("../controllers/userController");

const loginRoute = (app) => {
  // Create login route
  app.post("/login", userController);
};

// Export login route to be used by server
module.exports = loginRoute;
