const express = require("express");
const cors = require("cors");
const PORT = 3000;
const app = express();
const DB_connect = require("./src/Util/db");

const route_app = require("./src/Routes/cetecory.route");
const product_route = require("./src/Routes/product.route");
const app_order = require("./src/Routes/order.route");
const login_route = require("./src/Routes/login.route");
const adminroute = require("./src/Routes/admin.route");

// FIX CORS + FIX BODY SIZE LIMIT FOR IMAGES
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Static upload folder
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/uploads", express.static("uploads"));

// Connect DB
DB_connect();

// Routes
route_app(app);
product_route(app);
app_order(app);
login_route(app);
adminroute(app);

// Test
app.get("", (req, res) => {
  res.send("work");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
