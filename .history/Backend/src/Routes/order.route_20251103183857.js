const order = require("../Controller/order.controller");

const app_order = (app) => {
  app.get("/api/order", order.getAll);
  app.post("/api/order", order.postOrder);
  app.put("/api/order/:id", order.editOrder);
  app.delete("/api/order/:id", order.removeOrder);
  app.get("/api/order/getCount", order.getCount);
  app.get("/api/order/getTrendingProducts", order.getTrendingProducts);
};

module.exports = app_order;
