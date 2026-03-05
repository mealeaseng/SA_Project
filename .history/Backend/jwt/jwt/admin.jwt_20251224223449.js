const jwt = require("jsonwebtoken");

const ADMIN_SECRET = process.env.ADMIN_JWT_SECRET || "my_admin_secret_key";

// CREATE ADMIN TOKEN
function generateAdminToken(payload) {
  return jwt.sign({ ...payload, role: "admin" }, ADMIN_SECRET, {
    expiresIn: "1d",
  });
}

// VERIFY ADMIN TOKEN
function verifyAdminToken(token) {
  return jwt.verify(token, ADMIN_SECRET);
}

module.exports = {
  generateAdminToken,
  verifyAdminToken,
};
