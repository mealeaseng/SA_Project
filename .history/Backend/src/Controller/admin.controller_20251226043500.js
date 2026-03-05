const Admin = require("../Models/admin.model");
const bcrypt = require("bcryptjs");
const { generateAdminToken } = require("../../jwt/jwt/admin.jwt");

// ADMIN LOGIN
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateAdminToken({
    id: admin._id,
    email: admin.email,
    role: admin.role,
  });

  res.json({
    message: "Admin login success",
    token,
    admin,
  });
};

// CREATE ADMIN
const createAdmin = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const exists = await Admin.findOne({ email });
  if (exists) {
    return res.status(409).json({ message: "Admin already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hashed,
    phone,
  });

  res.status(201).json({ message: "Admin created", admin });
};

// GET ALL ADMINS
const getAdmins = async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
};

// GET ADMIN BY ID
const getAdminById = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }
  res.json(admin);
};

// UPDATE ADMIN
const updateAdmin = async (req, res) => {
  try {
    const data = {};

    if (req.body.name) data.name = req.body.name;
    if (req.body.email) data.email = req.body.email;
    if (req.body.phone) data.phone = req.body.phone;

    // ✅ Only hash password if provided
    if (req.body.password && req.body.password.trim() !== "") {
      data.password = await bcrypt.hash(req.body.password, 10);
    }

    // ✅ Handle image upload
    if (req.file) {
      data.profile_img = `/uploads/admin/${req.file.filename}`;
    }

    const admin = await Admin.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      message: "Admin updated successfully",
      admin,
    });
  } catch (error) {
    console.error("❌ Update admin error:", error);
    res.status(500).json({ message: "Update admin failed" });
  }
};

// DELETE ADMIN
const deleteAdmin = async (req, res) => {
  const admin = await Admin.findByIdAndDelete(req.params.id);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }
  res.json({ message: "Admin deleted" });
};

const registerFirstAdmin = async (req, res) => {
  const count = await Admin.countDocuments();

  if (count > 0) {
    return res.status(403).json({
      message: "Admin already exists. Please login.",
    });
  }

  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const hash = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hash,
    phone,
  });

  res.status(201).json({
    message: "Admin registered successfully",
    admin,
  });
};

const verifyAdminPassword = async (req, res) => {
  try {
    const { adminId, password } = req.body;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.json({ message: "Password verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Verification failed" });
  }
};

module.exports = {
  adminLogin,
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  registerFirstAdmin,
  verifyAdminPassword,
};
