const adminController = require("../Controller/admin.controller");
const adminAuth = require("../Util/admin.middleware");
const multer = require("multer");

module.exports = (app) => {
  // ✅ PUBLIC — FIRST ADMIN REGISTER
  app.post("/api/admin/register", adminController.registerFirstAdmin);

  // ✅ ADMIN LOGIN
  app.post("/api/admin/login", adminController.adminLogin);

  const upload = multer({ dest: "uploads/" });

  app.post(
    "/api/admin/register",
    upload.single("profile_img"),
    adminController.registerFirstAdmin
  );

  // 🔒 PROTECTED — ADMIN ONLY
  app.post("/api/admin", adminAuth, adminController.createAdmin);
  app.get("/api/admin", adminAuth, adminController.getAdmins);
  app.get("/api/admin/:id", adminAuth, adminController.getAdminById);
  app.put("/api/admin/:id", adminAuth, adminController.updateAdmin);
  app.delete("/api/admin/:id", adminAuth, adminController.deleteAdmin);
};
