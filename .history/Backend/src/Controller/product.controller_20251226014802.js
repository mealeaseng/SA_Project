const Product = require("../Models/product.model");
const Category = require("../Models/cetecory.model");

// ✅ GET all products
const Get_product = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCount = async (req, res) => {
  const result = await Product.countDocuments();
  res.json(result);
};

const getproductName = async (req, res) => {
  try {
    const { name } = req.params;
    const { search } = req.query; // support ?search= query too

    let products;

    if (name) {
      // e.g. /api/product/coffee
      products = await Product.find({
        name_product: { $regex: name, $options: "i" },
      });
    } else if (search) {
      // e.g. /api/product?search=coffee
      products = await Product.find({
        name_product: { $regex: search, $options: "i" },
      });
    } else {
      // all products
      products = await Product.find();
    }

    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const Post_product = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { product_id, name_product, price, qty, stock, dis, discount } =
      req.body;

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // ✅ Handle uploaded file
    let imgPath = null;
    if (req.file) {
      imgPath = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const newProduct = new Product({
      product_id,
      name_product,
      price,
      qty,
      stock,
      dis,
      discount,
      img: imgPath,
      category: categoryId,
      date: new Date(),
    });

    await newProduct.save();

    categoryExists.products.push(newProduct._id);
    await categoryExists.save();

    res.status(201).json({
      message: "✅ Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ PUT / UPDATE product by ID
const Put_product = async (req, res) => {
  try {
    const { id } = req.params;
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.product_id = req.body.product_id ?? product.product_id;
    product.name_product = req.body.name_product ?? product.name_product;
    product.price = req.body.price ?? product.price;
    product.qty = req.body.qty ?? product.qty;
    product.stock = req.body.stock ?? product.stock;
    product.dis = req.body.dis ?? product.dis;
    product.discount = req.body.discount ?? product.discount;

    // ✅ Handle new image
    if (req.file) {
      product.img = `${baseUrl}/uploads/${req.file.filename}`;
    }

    await product.save();

    res.status(200).json({
      message: "✅ Product updated successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE product by ID
const Remove_product = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const GetTrendProduct = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const trend_ = await Product.aggregate([
      {
        $sort: { qty: -1 }, // Highest quantity first
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: 1,
          name_product: 1,
          img: 1,
          price: 1,
          qty: 1,
          discount: 1,
          amount: 1,
        },
      },
    ]);

    res.status(200).json(trend_);
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
