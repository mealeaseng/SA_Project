const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product: [
    (product = { type: String, required: true }),
    (thumbnail = { type: String }),
  ],
});

// Pre-save hook to calculate the amount for each product
productSchema.pre("save", function (next) {
  this.category.forEach((item) => {
    item.amount = item.price * item.qty - (item.discount || 0); // Calculate amount
  });
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
