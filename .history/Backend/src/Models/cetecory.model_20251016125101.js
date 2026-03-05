// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name_category: { type: String, required: true },
//   thumbnail: { type: String },
//   category: [
//     {
//       id: { type: Number },
//       img: { type: String },
//       title: { type: String },
//       price: { type: Number },
//       discount: { type: Number, default: 0 },
//       qty: { type: Number, default: 1 },
//       stock: { type: Number, default: 0 },
//       description: { type: String },
//       date: { type: Date, default: Date.now },
//       amount: { type: Number },
//     },
//   ],
// });

// // Pre-save hook to calculate amount
// productSchema.pre("save", function (next) {
//   this.category.forEach((item) => {
//     item.amount = item.price * item.qty - (item.discount || 0);
//   });
//   next();
// });

// const Product = mongoose.model("Products", productSchema);

// module.exports = Product;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: { type: String },
  name_category: { type: String, required: true },
  thumbnail: { type: String },
});

const Cetecory = mongoose.model("Cay", productSchema);

module.exports = Cetecory;
