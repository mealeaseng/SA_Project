// controllers/category.controller.js
const Category = require("../Models/cetecory.model");
const Product = require("../Models/product.model"); // Note lowercase 'models'
const fs = require("fs");
const path = require("path");

// GET all categories with populated products
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("products");

    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCountCetecory = async (req, res) => {
  const getCountCetecory = await Category();
  res.status(200).json(getCountCetecory);
};

const getCount = async (req, res) => {
  const resultCount = await Category.countDocuments();
  res.json(resultCount);
};

//  POST: Create a category or add products to existing
const postCategoryOrProduct = async (req, res) => {
  try {
    // Multer provides the uploaded file here:
    const file = req.file;
    const { name_category, products } = req.body;

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // Log incoming data for debugging
    console.log("Incoming body:", req.body);
    console.log("Incoming file:", req.file);

    // Ensure category name is provided
    if (!name_category) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Check if category already exists
    let category = await Category.findOne({ name_category });

    if (category) {
      // Add new products to existing category
      if (!Array.isArray(products)) {
        return res.status(400).json({
          message: "Products must be an array of product IDs",
        });
      }

      const uniqueProducts = products.filter(
        (pid) => !category.products.includes(pid)
      );

      category.products.push(...uniqueProducts);
      await category.save();

      return res.status(200).json({
        message: "Products added to existing category",
        category,
      });
    }

    // ✅ Handle thumbnail (uploaded file or fallback URL)
    const thumbnail = file
      ? `${baseUrl}/uploads/categories/${file.filename}`
      : "https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-4.1.0&q=60&w=3000";
    // ✅ Create new category
    const newCategory = new Category({
      name_category,
      thumbnail,
      products: Array.isArray(products) ? products : [],
    });

    await newCategory.save();

    return res.status(201).json({
      message: `✅ New category '${name_category}' created successfully`,
      category: newCategory,
    });
  } catch (err) {
    console.error("🔥 Error in postCategoryOrProduct:", err);
    res.status(500).json({ error: err.message });
  }
};

//  PUT: Update product by ID
const updateProductInCategory = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const { productId, updateData } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (!category.products.includes(productId)) {
      return res
        .status(400)
        .json({ message: "Product does not belong to this category" });
    }

    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ✅ PUT: Update category (name, thumbnail)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_category } = req.body;
    const file = req.file;

    // ✅ FIX: define baseUrl here
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name_category) {
      category.name_category = name_category;
    }

    if (file) {
      // ✅ DELETE OLD IMAGE (LOCAL ONLY)
      if (category.thumbnail && category.thumbnail.includes("/uploads/")) {
        const relativePath = category.thumbnail.replace(baseUrl + "/", "");
        const oldPath = path.join(__dirname, "../../", relativePath);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // ✅ SAVE NEW IMAGE URL
      category.thumbnail = `${baseUrl}/uploads/categories/${file.filename}`;
    }

    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    console.error("Update category error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE: Remove product from category or delete the whole category
const removeProductOrCategory = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const { productId } = req.query;

    const category = await Category.findById(categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (productId) {
      category.products = category.products.filter(
        (pid) => pid.toString() !== productId
      );
      await category.save();

      return res
        .status(200)
        .json({ message: "Product removed from category", category });
    } else {
      await Category.findByIdAndDelete(categoryId);
      return res.status(200).json({ message: "Category deleted" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCategories,
  postCategoryOrProduct,
  updateProductInCategory,
  updateCategory,
  removeProductOrCategory,
  getCount,
  getCountCetecory,
};
