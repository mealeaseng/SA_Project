const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cetecory = require("../Controller/cetecory.controller");

// ============================
// UPLOAD CONFIG
// ============================
const uploadDir = "uploads/categories";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ============================
// ROUTES
// ============================
const route_app = (app) => {
  app.get("/api/cetecory", cetecory.getAllCategories);
  app.get("/api/cetecory/count", cetecory.getCount);

  // CREATE category
  app.post(
    "/api/cetecory",
    upload.single("thumbnail"),
    cetecory.postCategoryOrProduct
  );

  // UPDATE category
  app.put(
    "/api/cetecory/:id",
    upload.single("thumbnail"),
    cetecory.updateCategory
  );

  // UPDATE product inside category
  app.put("/api/cetecory/:id/product", cetecory.updateProductInCategory);

  // DELETE category or product
  app.delete("/api/cetecory/:id", cetecory.removeProductOrCategory);
};

module.exports = route_app;
