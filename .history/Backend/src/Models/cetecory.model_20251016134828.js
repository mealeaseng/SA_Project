const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name_category: { type: String, required: true },
  thumbnail: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
