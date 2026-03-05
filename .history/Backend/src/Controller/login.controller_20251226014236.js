const Login = require("../Models/login.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../jwt/jwt/jwt");

// ✅ Get all login records
const getLogin = async (req, res) => {
  try {
    const login_ = await Login.find();
    res.status(200).json(login_);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await Login.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postLogin = async (req, res) => {
  try {
    const { name_user, phone_number, email, password, address } = req.body;

    // Check if email already exists
    const existingUser = await Login.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least <b>8</b> characters" });
    }

    const slatPost = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, slatPost);

    const newUser = new Login({
      name_user,
      phone_number,
      email,
      password: hashPassword,
      address,
    });
    await newUser.save();

    // Send back both message and user data
    res.status(201).json({
      message: "User registered successfully",
      user: newUser, // <-- this is what frontend needs
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update (PUT) login record by ID
const editLogin = async (req, res) => {
  try {
    const { id } = req.params;
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const data = {};

    if (req.body.name_user) data.name_user = req.body.name_user;
    if (req.body.phone_number) data.phone_number = req.body.phone_number;
    if (req.body.email) data.email = req.body.email;
    if (req.body.address) data.address = req.body.address;

    // 🔐 PASSWORD
    if (req.body.password && req.body.password.length >= 8) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(req.body.password, salt);
    }

    // 🖼️ PROFILE IMAGE (FIX)
    if (req.file) {
      data.profile_img = `${baseUrl}/uploads/users/${req.file.filename}`;
    }

    const updatedLogin = await Login.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedLogin) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated",
      user: updatedLogin,
    });
  } catch (err) {
    console.error("Edit login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete (DELETE) login record by ID
const removeLogin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLogin = await Login.findByIdAndDelete(id);

    if (!deletedLogin) {
      return res.status(404).json({ message: "Login not found" });
    }

    res.status(200).json({ message: "Login deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Missing username or password",
      });
    }

    // Find user by name / phone / email
    const user = await Login.findOne({
      $or: [
        { name_user: username },
        { phone_number: username },
        { email: username },
      ],
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    // ✅ CREATE JWT TOKEN
    const token = generateToken({
      id: user._id,
      email: user.email,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name_user: user.name_user,
        phone_number: user.phone_number,
        email: user.email,
        address: user.address,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getLogin,
  postLogin,
  checkLogin,
  editLogin,
  removeLogin,
  getUserById,
};
