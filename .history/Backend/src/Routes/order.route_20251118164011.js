const order = require("../Controller/order.controller");

const app_order = (app) => {
  app.get("/api/order", order.getAll);
  app.post("/api/order", order.postOrder);
  app.put("/api/order/:id", order.editOrder);
  app.delete("/api/order/:id", order.removeOrder);

  app.get("/api/order/getCount", order.getCount);
  app.get("/api/order/getTrendingProducts", order.getTrendingProducts);
  app.get("/api/order/user/:id", order.getOrdersByUser);

  // ---- ADD THESE ----
  app.get("/api/order/pending", order.getPending);
  app.put("/api/order/confirm/:id", order.confirmOrder);
  app.put("/api/order/cancel/:id", order.cancelOrder);

  app.get("/api/order/test-telegram", (req, res) => {
    const { sendTelegram } = require("../bot/telegram_bot");
    sendTelegram("Hello from backend!");
    res.send("Telegram test message sent!");
  });

  app.get("/api/order/send-all", order.sendAllOrdersToTelegram);
};

module.exports = app_order;
