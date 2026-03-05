const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: { type: String },
  name_product: { type: String, required: true },
  name_catecory: { type: String },
  img: { type: String },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  stock: { type: Number, required: true },
  dis: { type: String, required: true },
  discount: { type: Number, required: true },
  amount: { type: Number },
  date: { type: Date, default: Date.now }, // sets the current date automatically
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

productSchema.pre("save", function (next) {
  this.amount = this.price * this.qty - (this.discount || 0);
  next();
});

module.exports = mongoose.model("Product", productSchema);
