const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cetecory = require("../Controller/cetecory.controller");
const path = require("path");

const uploadDir = "uploads/categories";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

const route_app = (app) => {
  app.get("/api/cetecory/count", cetecory.getCount);
  app.get("/api/cetecory", cetecory.getAllCategories);

  // ✅ CREATE category
  app.post(
    "/api/cetecory",
    upload.single("thumbnail"),
    cetecory.postCategoryOrProduct
  );

  // ✅ UPDATE category (fix)
  app.put(
    "/api/cetecory/:id",
    upload.single("thumbnail"),
    cetecory.updateCategory
  );

  // ✅ UPDATE product inside category (optional: different path)
  app.put("/api/cetecory/:id/product", cetecory.updateProductInCategory);

  // ✅ DELETE category or product
  app.delete("/api/cetecory/:id", cetecory.removeProductOrCategory);

  // ✅ Count route
  app.get("/api/cetecory/getCount", cetecory.getCount);
};

module.exports = route_app;
