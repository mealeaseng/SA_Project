const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("AUTH HEADER:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ NO AUTH HEADER");
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN RECEIVED:", token);

    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    console.log("DECODED TOKEN:", decoded);

    req.admin = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
