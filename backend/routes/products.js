const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

const router = express.Router();

// Path to your sample products JSON
const sampleProductsPath = path.join(__dirname, '../sample-products.json');

// Helper function to load sample products
const loadSampleProducts = () => {
  try {
    const data = fs.readFileSync(sampleProductsPath, 'utf-8');
    const products = JSON.parse(data);
    return products;
  } catch (error) {
    console.error('Error loading sample products:', error);
    return [];
  }
};

// Get all products with optional filters
router.get('/', async (req, res) => {
  try {
    console.log('Fetching products with query:', req.query);
    const { category, minPrice, maxPrice, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let products = [];

    // Check DB connection
    if (mongoose.connection.readyState === 1) {
      products = await Product.find(filter).sort({ createdAt: -1 }).lean();
      console.log(`Found ${products.length} products in DB`);
    } else {
      console.warn('Database not connected. Falling back to sample products.');
    }

    // If DB is empty, use sample JSON
    if (products.length === 0) {
      products = loadSampleProducts();

      // Apply filters on sample products
      if (category) products = products.filter(p => p.category === category);
      if (minPrice) products = products.filter(p => p.price >= Number(minPrice));
      if (maxPrice) products = products.filter(p => p.price <= Number(maxPrice));
      if (search) {
        products = products.filter(
          p => p.name.toLowerCase().includes(search.toLowerCase()) ||
               p.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      console.log(`Using ${products.length} products from sample JSON`);
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      inStock: req.body.inStock !== false
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
