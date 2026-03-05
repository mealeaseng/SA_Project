const adminController = require("../Controller/admin.controller");
const adminAuth = require("../Util/admin.middleware");

module.exports = (app) => {
  // 🔓 login
  app.post("/api/admin/login", adminController.adminLogin);

  // 🔒 CRUD (ADMIN ONLY)
  app.post("/api/admin", adminAuth, adminController.createAdmin);
  app.get("/api/admin", adminAuth, adminController.getAdmins);
  app.get("/api/admin/:id", adminAuth, adminController.getAdminById);
  app.put("/api/admin/:id", adminAuth, adminController.updateAdmin);
  app.delete("/api/admin/:id", adminAuth, adminController.deleteAdmin);
};
