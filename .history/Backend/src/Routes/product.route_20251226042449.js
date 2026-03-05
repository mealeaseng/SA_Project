const product = require("../Controller/product.controller");
const multer = require("multer");
const path = require("path");

// 🧩 Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

const product_route = (app) => {
  app.get("/api/product/count", product.getCount);
  app.get("/api/product", product.Get_product);
  app.get("/api/product/trend", product.GetTrendProduct);

  app.get("/api/product/:name", product.getproductName);

  // ✅ Apply multer for file upload
  app.post(
    "/api/product/:id",
    upload.single("thumbnail"),
    product.Post_product
  );

  // ✅ FIXED — add multer for file upload support
  app.put("/api/product/:id", upload.single("img"), product.Put_product);
  app.delete("/api/product/:id", product.Remove_product);
};

module.exports = product_route;
