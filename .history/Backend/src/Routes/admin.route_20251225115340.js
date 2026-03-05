const adminController = require("../Controller/admin.controller");
const adminAuth = require("../Util/admin.middleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/admin" });

const adminroute = (app) => {
  // ✅ PUBLIC — FIRST ADMIN REGISTER (WITH IMAGE)
  app.post(
    "/api/admin/register",
    upload.single("profile_img"),
    adminController.registerFirstAdmin
  );

  // ✅ ADMIN LOGIN
  app.post("/api/admin/login", adminController.adminLogin);

  // 🔒 PROTECTED — ADMIN ONLY
  app.post("/api/admin", adminAuth, adminController.createAdmin);
  app.get("/api/admin", adminAuth, adminController.getAdmins);
  app.get("/api/admin/:id", adminAuth, adminController.getAdminById);
  app.put("/api/admin/:id", adminAuth, adminController.updateAdmin);
  app.delete("/api/admin/:id", adminAuth, adminController.deleteAdmin);
};

module.exports = adminroute;
