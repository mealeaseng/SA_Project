const login_Controller = require("../Controller/login.controller");
const app_route = (app) => {
  app.get("/api/login", login_Controller.getLogin);
  app.get("/api/login/:id", login_Controller.getUserById);
  app.post("/api/login", login_Controller.postLogin);
  app.post("/api/checkLogin", login_Controller.checkLogin);
  app.put("/api/login/:id", login_Controller.editLogin);
  app.delete("/api/login/:id", login_Controller.removeLogin);
};

module.exports = app_route;
