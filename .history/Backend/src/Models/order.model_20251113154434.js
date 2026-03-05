const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product_id: { type: String },
  name_product: { type: String },
  name_category: { type: String },
  img: { type: String },
  price: { type: Number },
  qty: { type: Number },
  stock: { type: Number },
  dis: { type: String },
  discount: { type: Number, min: 0, max: 100, default: 0 },
  amount: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

  // 🧍 Customer Info (optional)
  customer_name: { type: String },
  customer_phone: { type: String },
  customer_address: { type: String },

  // 🚚 Delivery or Pickup
  delivery_method: {
    type: String,
    enum: ["Delivery", "Pickup"],
    default: "Pickup",
  },

  // 📦 Delivery details (optional)
  delivery_status: {
    type: String,
    enum: ["Pending", "On the way", "Delivered"],
    default: "Pending",
  },

  order_date: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
});

orderSchema.pre("save", function (next) {
  this.amount = this.price * this.qty * (1 - this.discount / 100);
  next();
});

module.exports = mongoose.model("Order", orderSchema);
