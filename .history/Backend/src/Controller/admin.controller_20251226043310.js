const Admin = require("../Models/admin.model");
const bcrypt = require("bcryptjs");
const { generateAdminToken } = require("../../jwt/jwt/admin.jwt");

// LOGIN
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateAdminToken({
    id: admin._id,
    email: admin.email,
    role: admin.role,
  });

  res.json({ token, admin });
};

// GET CURRENT ADMIN
const getCurrentAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (err) {
    console.error("❌ getCurrentAdmin error:", err);
    res.status(500).json({ message: "Failed to load admin" });
  }
};

// UPDATE CURRENT ADMIN
const updateAdmin = async (req, res) => {
  try {
    const data = {};

    if (req.body.name) data.name = req.body.name;
    if (req.body.email) data.email = req.body.email;
    if (req.body.phone) data.phone = req.body.phone;

    if (req.body.password && req.body.password.trim() !== "") {
      data.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.file) {
      data.profile_img = `/uploads/admin/${req.file.filename}`;
    }

    const admin = await Admin.findByIdAndUpdate(req.user.id, data, {
      new: true,
    });

    res.json({ message: "Profile updated", admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};

// VERIFY OLD PASSWORD
const verifyAdminPassword = async (req, res) => {
  const { password } = req.body;

  const admin = await Admin.findById(req.user.id);
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: "Incorrect password" });

  res.json({ message: "Password verified" });
};

// REGISTER FIRST ADMIN
const registerFirstAdmin = async (req, res) => {
  const count = await Admin.countDocuments();
  if (count > 0) {
    return res.status(403).json({ message: "Admin already exists" });
  }

  const { name, email, password, phone } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hash,
    phone,
  });

  res.status(201).json({ message: "Admin registered", admin });
};

module.exports = {
  adminLogin,
  getCurrentAdmin,
  updateAdmin,
  verifyAdminPassword,
  registerFirstAdmin,
};
