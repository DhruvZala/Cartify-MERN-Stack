const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create a product
router.post("/", async (req, res) => {
  const body = req.body;

  if (!body || !body.name || !body.price || !body.category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = new Product({
      name: body.name,
      price: body.price,
      category: body.category,
    });

    const savedProduct = await product.save();
    return res
      .status(201)
      .json({ message: "Product created", product: savedProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Failed to create product" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: 1 });
    return res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Failed to get products" });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Failed to get product" });
  }
});

// Update product by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    return res.json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(400).json({ message: "Failed to update product" });
  }
});

// Delete product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    return res.json({ message: "Product deleted", product: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;
