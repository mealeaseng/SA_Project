const multer = require("multer");
const fs = require("fs");
const path = require("path");
const login_Controller = require("../Controller/login.controller");

// ============================
// UPLOAD CONFIG
// ============================
const uploadDir = "uploads/users";
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
const app_route = (app) => {
  app.get("/api/login", login_Controller.getLogin);
  app.get("/api/login/:id", login_Controller.getUserById);
  app.post("/api/login", login_Controller.postLogin);
  app.post("/api/checkLogin", login_Controller.checkLogin);

  // ✅ UPDATE user (WITH IMAGE)
  app.put(
    "/api/login/:id",
    upload.single("profile_img"),
    login_Controller.editLogin
  );

  app.delete("/api/login/:id", login_Controller.removeLogin);
};

module.exports = app_route;
