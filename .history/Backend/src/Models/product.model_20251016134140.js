const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name_product: { type: String, required: true },
  img: { type: String },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  dis: { type: String }, // you might want to rename this to `description`
  discount: { type: Number, default: 0 },
  amount: { type: Number },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // link to Category
    required: true,
  },
});

// Pre-save hook to calculate amount
productSchema.pre("save", function (next) {
  this.amount = this.price * this.qty - (this.discount || 0);
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
