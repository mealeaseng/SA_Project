const Admin = require("../Models/admin.model");
const bcrypt = require("bcryptjs");
const { generateAdminToken } = require("../../jwt/jwt/admin.jwt");

// =======================
// CREATE ADMIN
// =======================
const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({
      message: "Admin created",
      admin,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// GET ALL ADMINS
// =======================
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// GET ADMIN BY ID
// =======================
const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// UPDATE ADMIN
// =======================
const updateAdmin = async (req, res) => {
  try {
    const data = {};

    if (req.body.name) data.name = req.body.name;
    if (req.body.email) data.email = req.body.email;

    if (req.body.password) {
      if (req.body.password.length < 8) {
        return res
          .status(400)
          .json({ message: "Password must be at least 8 characters" });
      }

      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(req.body.password, salt);
    }

    const admin = await Admin.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      message: "Admin updated",
      admin,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// DELETE ADMIN
// =======================
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json({ message: "Admin deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// ADMIN LOGIN
// =======================
const adminLogin = async (req, res) => {
  try {
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
    });

    res.json({
      message: "Admin login success",
      token,
      admin,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  adminLogin,
};
