const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "admin_secret_key";

const generateAdminToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};

const verifyAdminToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = {
  generateAdminToken,
  verifyAdminToken,
};
