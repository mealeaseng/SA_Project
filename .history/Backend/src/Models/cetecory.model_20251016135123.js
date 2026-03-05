const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name_category: { type: String, required: true },
  thumbnail: { type: String },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
