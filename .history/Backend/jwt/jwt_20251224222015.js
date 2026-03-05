const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "my_secret_key";

// CREATE TOKEN
function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

// VERIFY TOKEN
function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = {
  generateToken,
  verifyToken,
};
