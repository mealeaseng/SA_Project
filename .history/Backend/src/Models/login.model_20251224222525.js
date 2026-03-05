const mongoose = require("mongoose");

const user_list = new mongoose.Schema({
  profile_img: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", // ✅ Default profile picture
  },
  name_user: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

user_list.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model("user_login", user_list);
