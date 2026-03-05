const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_login",
    required: true,
  },

  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      name_product: { type: String, required: true },
      name_category: { type: String },
      img: { type: String },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      discount: { type: Number, min: 0, max: 100, default: 0 },
      amount: { type: Number, default: 0 },
    },
  ],

  customer_name: { type: String, required: true },
  customer_phone: { type: String, required: true },
  customer_address: { type: String, required: true },

  delivery_method: {
    type: String,
    enum: ["Delivery", "Pickup", "QR Pay", "Cash"],
    default: "Pickup",
  },

  // 🔥 ADD THIS FIELD
  payment_method: {
    type: String,
    enum: ["Cash", "QR Pay"],
    required: true,
  },

  delivery_status: {
    type: String,
    enum: ["Pending", "On the way", "Delivered"],
    default: "Pending",
  },

  order_date: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
});

// SAFE auto-calc
orderSchema.pre("save", function (next) {
  this.products = this.products.map((item) => ({
    ...item,
    amount:
      (item.price || 0) * (item.qty || 0) * (1 - (item.discount || 0) / 100),
  }));
  next();
});

module.exports = mongoose.model("Order", orderSchema);
