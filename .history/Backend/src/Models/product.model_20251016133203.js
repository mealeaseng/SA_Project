const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: { type: String },
  name_product: { type: String, required: true },
  img: { type: String },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  dis: { type: String, required: true },
  discount: { type: Number, required: true }, // Changed to Number
  amount: { type: Number },
});

// Pre-save hook to calculate amount
productSchema.pre("save", function (next) {
  this.amount = this.price * this.qty - (this.discount || 0);
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
