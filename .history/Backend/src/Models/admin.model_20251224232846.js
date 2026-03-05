const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now },
});

adminSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model("admin", adminSchema);
