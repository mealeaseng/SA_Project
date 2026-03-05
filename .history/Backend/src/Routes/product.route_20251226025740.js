const product = require("../Controller/product.controller");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ============================
// MULTER STORAGE
// ============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/products";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ============================
// ROUTES
// ============================
const product_route = (app) => {
  app.get("/api/product/count", product.getCount);
  app.get("/api/product", product.Get_product);
  app.get("/api/product/trend", product.GetTrendProduct);

  // CREATE
  app.post("/api/product/:id", upload.single("img"), product.Post_product);

  // UPDATE
  app.put("/api/product/:id", upload.single("img"), product.Put_product);

  // DELETE
  app.delete("/api/product/:id", product.Remove_product);

  // ⚠️ KEEP THIS LAST (VERY IMPORTANT)
  app.get("/api/product/:name", product.getproductName);
};

module.exports = product_route;
