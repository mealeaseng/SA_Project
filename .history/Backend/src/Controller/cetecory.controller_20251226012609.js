const Category = require("../Models/cetecory.model");
const Product = require("../Models/product.model");
const fs = require("fs");
const path = require("path");

// ============================
// GET ALL CATEGORIES
// ============================
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("products");
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================
// GET CATEGORY COUNT
// ============================
const getCount = async (req, res) => {
  try {
    const count = await Category.countDocuments();
    res.json(count);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================
// CREATE CATEGORY
// ============================
const postCategoryOrProduct = async (req, res) => {
  try {
    const file = req.file;
    const { name_category, products } = req.body;

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    if (!name_category) {
      return res.status(400).json({ message: "Category name is required" });
    }

    let category = await Category.findOne({ name_category });

    // ADD PRODUCTS TO EXISTING CATEGORY
    if (category) {
      if (!Array.isArray(products)) {
        return res.status(400).json({ message: "Products must be an array" });
      }

      const uniqueProducts = products.filter(
        (p) => !category.products.includes(p)
      );

      category.products.push(...uniqueProducts);
      await category.save();

      return res.status(200).json({
        message: "Products added to existing category",
        category,
      });
    }

    // CREATE NEW CATEGORY
    const thumbnail = file
      ? `${baseUrl}/uploads/categories/${file.filename}`
      : "https://images.unsplash.com/photo-1512152272829-e3139592d56f";

    const newCategory = new Category({
      name_category,
      thumbnail,
      products: Array.isArray(products) ? products : [],
    });

    await newCategory.save();

    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (err) {
    console.error("Create category error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ============================
// UPDATE CATEGORY
// ============================
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_category } = req.body;
    const file = req.file;

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name_category) {
      category.name_category = name_category;
    }

    if (file) {
      // DELETE OLD IMAGE
      if (category.thumbnail?.includes("/uploads/")) {
        const oldPath = path.join(
          __dirname,
          "../../",
          category.thumbnail.replace(baseUrl + "/", "")
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

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

// ============================
// DELETE CATEGORY OR PRODUCT
// ============================
const removeProductOrCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.query;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (productId) {
      category.products = category.products.filter(
        (p) => p.toString() !== productId
      );
      await category.save();

      return res.json({
        message: "Product removed from category",
        category,
      });
    }

    await Category.findByIdAndDelete(id);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============================
// EXPORTS (FIXED)
// ============================
module.exports = {
  getAllCategories,
  postCategoryOrProduct,
  updateCategory,
  removeProductOrCategory,
  getCount,
};
