const { verifyAdminToken } = require("../../jwt/admin.jwt.js");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAdminToken(token);
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid admin token" });
  }
};
