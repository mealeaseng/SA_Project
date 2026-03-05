const { verifyAdminToken } = require("../../jwt/jwt/admin.jwt");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAdminToken(token); // ✅ USE YOUR HELPER

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error("❌ JWT verify error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
