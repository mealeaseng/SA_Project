const adminController = require("../Controller/admin.controller");
const adminAuth = require("../Util/admin.middleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/admin" });

const adminroute = (app) => {
  // PUBLIC
  app.post(
    "/api/admin/register",
    upload.single("profile_img"),
    adminController.registerFirstAdmin
  );

  app.post("/api/admin/login", adminController.adminLogin);

  // 🔐 VERIFY OLD PASSWORD (JWT-based)
  app.post(
    "/api/admin/verify-password",
    adminAuth,
    (req, res, next) => {
      console.log("✅ VERIFY-PASSWORD ROUTE HIT");
      next();
    },
    adminController.verifyAdminPassword
  );

  // 🔒 CURRENT ADMIN ONLY
  app.get("/api/admin/me", adminAuth, adminController.getCurrentAdmin);

  app.put(
    "/api/admin/me",
    adminAuth,
    upload.single("profile_img"),
    adminController.updateAdmin
  );
};

module.exports = adminroute;
