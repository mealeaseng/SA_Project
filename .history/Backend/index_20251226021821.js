if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const fs = require("fs"); // ✅ REQUIRED
const path = require("path"); // ✅ REQUIRED

const app = express();
const PORT = process.env.PORT || 10000; // ✅ Render uses PORT

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

// =======================
// ENSURE uploads/ EXISTS (RENDER FIX)
// =======================
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// =======================
// STATIC FILES
// =======================
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
  res.status(200).json({ message: "✅ API is running" });
});

// =======================
// START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
