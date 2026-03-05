if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const DB_connect = require("./src/Util/db");

const category_route = require("./src/Routes/cetecory.route");
const product_route = require("./src/Routes/product.route");
const order_route = require("./src/Routes/order.route");
const login_route = require("./src/Routes/login.route");
const admin_route = require("./src/Routes/admin.route");

// =======================
// MIDDLEWARE
// =======================
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ✅ Static uploads (ONLY ONCE)
app.use("/uploads", express.static("uploads"));

// =======================
// DATABASE
// =======================
DB_connect();

// =======================
// ROUTES
// =======================
category_route(app);
product_route(app);
order_route(app);
login_route(app);
admin_route(app);

// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
  res.status(200).json({
    message: "✅ API is running",
  });
});

// =======================
// START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
