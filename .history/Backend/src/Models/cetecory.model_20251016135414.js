const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name_category: { type: String, required: true },
  thumbnail: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Category", categorySchema);
