const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: { type: String },
  name_product: { type: String, required: true },
  img: { type: String },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  dis: { type: String, required: true },
  discount: { type: String, required: true },
  amount: { type: Number },
});

productSchema.pre("save", function (next) {
  this.category.forEach((item) => {
    item.amount = item.price * item.qty - (item.discount || 0);
  });
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
