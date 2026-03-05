const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String, // keep as string
      required: true,
      trim: true,
    },

    role: {
      type: String,
      default: "admin",
      enum: ["admin", "super-admin"],
    },

    profile_img: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

// 🔒 Hide password from API responses
adminSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model("Admin", adminSchema);
