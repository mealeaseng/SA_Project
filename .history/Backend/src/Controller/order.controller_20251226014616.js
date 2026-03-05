const Order = require("../Models/order.model");
const { sendTelegram } = require("../bot/telegram_bot");
const Product = require("../Models/product.model");

const getAll = async (req, res) => {
  try {
    const orders = await Order.find().populate("user_id");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔢 Get total order count
const getCount = async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➕ Post new order(s)
const postOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // 1️⃣ CHECK STOCK
    for (const item of orderData.products) {
      const product = await Product.findById(item.product_id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name_product}`,
        });
      }
    }

    // 2️⃣ CREATE ORDER (ONLY ONE ORDER)
    const order = await Order.create(orderData);

    // 3️⃣ UPDATE STOCK
    for (const item of orderData.products) {
      await Product.findByIdAndUpdate(item.product_id, {
        $inc: {
          stock: -item.qty,
          qty: item.qty,
        },
      });
    }

    // 4️⃣ TOTAL
    const totalAmount = orderData.products.reduce(
      (sum, item) => sum + item.price * item.qty * (1 - item.discount / 100),
      0
    );

    // 5️⃣ TELEGRAM
    let productList = "";
    orderData.products.forEach((p, i) => {
      productList += `${i + 1}. ${p.name_product}
Qty: ${p.qty}
Price: $${p.price}
Discount: ${p.discount}%\n\n`;
    });

    sendTelegram(
      `<b>🆕 New Order</b>

👤 ${orderData.customer_name}
📞 ${orderData.customer_phone}
📍 ${orderData.customer_address}

<b>Products:</b>
${productList}

Total: $${totalAmount.toFixed(2)}
Payment: ${orderData.payment_method}
Delivery: ${orderData.delivery_method}`
    );

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Edit order
const editOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Delete order
const removeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTrendingProducts = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const trending = await Order.aggregate([
      { $unwind: "$products" }, // 🔥 IMPORTANT! Expand product list

      {
        $group: {
          _id: "$products.product_id",
          name_product: { $first: "$products.name_product" },
          img: { $first: "$products.img" },
          price: { $first: "$products.price" },
          discount: { $first: "$products.discount" },

          totalQty: { $sum: "$products.qty" }, // 👍 sum qty from items
          totalOrders: { $sum: 1 }, // number of orders that include product
        },
      },

      { $sort: { totalQty: -1 } },
      { $limit: parseInt(limit) },
    ]);

    res.status(200).json(trending);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPending = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Pending" }).populate("user_id"); // 🟢 Add this!

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Confirm an order
// 🟢 Confirm an order
const confirmOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Order.findByIdAndUpdate(
      id,
      { status: "confirmed" },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Order not found" });

    // Get customer name from order
    const customerName = updated.customer_name;

    // Send Telegram message
    sendTelegram(`
<b>✅ Order Confirmed</b>
<b>Order ID:</b> ${id}
<b>Customer:</b> ${customerName}
    `);

    res.status(200).json({ message: "Order confirmed", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const orders = await Order.find({ user_id: userId }).populate("user_id"); // Get user info

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔴 Cancel an order
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Order.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true }
    );

    sendTelegram(`<b>❌ Order Cancelled</b>\nOrder ID: ${id}`);

    if (!updated) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order cancelled", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getCount,
  postOrder,
  getTrendingProducts,
  editOrder,
  removeOrder,
  getPending,
  confirmOrder,
  cancelOrder,
  getOrdersByUser,
};
