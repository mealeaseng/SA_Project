const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_login",
    required: true,
  },

  // ⭐ MANY PRODUCTS IN ONE ORDER
  products: [
    {
      product_id: { type: String },
      name_product: { type: String },
      name_category: { type: String },
      img: { type: String },
      price: { type: Number },
      qty: { type: Number },
      discount: { type: Number, min: 0, max: 100, default: 0 },
      amount: { type: Number },
    },
  ],

  // 🧍 Customer Info
  customer_name: { type: String },
  customer_phone: { type: String },
  customer_address: { type: String },

  // 🚚 Delivery or Pickup
  delivery_method: {
    type: String,
    enum: ["Delivery", "Pickup"],
    default: "Pickup",
  },

  // 📦 Delivery Status
  delivery_status: {
    type: String,
    enum: ["Pending", "On the way", "Delivered"],
    default: "Pending",
  },

  order_date: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
});

// 🔄 Auto-calc amount for each product
orderSchema.pre("save", function (next) {
  this.products = this.products.map((item) => ({
    ...item,
    amount: item.price * item.qty * (1 - item.discount / 100),
  }));
  next();
});

module.exports = mongoose.model("Order", orderSchema);
