const Product = require("../Models/product.model");
const Category = require("../Models/cetecory.model");
const mongoose = require("mongoose");

// ============================
// GET ALL PRODUCTS
// ============================
const Get_product = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================
// COUNT
// ============================
const getCount = async (req, res) => {
  const result = await Product.countDocuments();
  res.json(result);
};

// ============================
// SEARCH BY NAME
// ============================
const getproductName = async (req, res) => {
  try {
    const { name } = req.params;

    const products = await Product.find({
      name_product: { $regex: name, $options: "i" },
    });

    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================
// CREATE PRODUCT
// ============================
const Post_product = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // ✅ Validate category ID
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(400).json({ message: "Category not found" });
    }

    // ✅ Ensure products array exists
    if (!Array.isArray(categoryExists.products)) {
      categoryExists.products = [];
    }

    // ✅ Validate required fields
    const { product_id, name_product, price, qty, stock, dis, discount } =
      req.body;

    if (
      !name_product ||
      price === undefined ||
      qty === undefined ||
      stock === undefined ||
      dis === undefined ||
      discount === undefined
    ) {
      return res.status(400).json({
        message: "Missing required product fields",
      });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // ✅ FIXED image path
    const imgPath = req.file
      ? `${baseUrl}/uploads/products/${req.file.filename}`
      : null;

    const newProduct = new Product({
      product_id,
      name_product,
      price: Number(price),
      qty: Number(qty),
      stock: Number(stock),
      dis,
      discount: Number(discount),
      img: imgPath,
      category: categoryId,
    });

    await newProduct.save();

    categoryExists.products.push(newProduct._id);
    await categoryExists.save();

    res.status(201).json({
      message: "✅ Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("POST PRODUCT ERROR:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

// ============================
// UPDATE PRODUCT
// ============================
const Put_product = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    Object.assign(product, req.body);

    if (req.file) {
      product.img = `${baseUrl}/uploads/products/${req.file.filename}`;
    }

    await product.save();

    res.status(200).json({
      message: "✅ Product updated successfully",
      product,
    });
  } catch (err) {
    console.error("PUT PRODUCT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ============================
// DELETE PRODUCT
// ============================
const Remove_product = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================
// TREND PRODUCT
// ============================
const GetTrendProduct = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const trend = await Product.aggregate([
      { $sort: { qty: -1 } },
      { $limit: limit },
      {
        $project: {
          name_product: 1,
          img: 1,
          price: 1,
          qty: 1,
          discount: 1,
        },
      },
    ]);

    res.status(200).json(trend);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  Get_product,
  Post_product,
  Put_product,
  Remove_product,
  getCount,
  getproductName,
  GetTrendProduct,
};
