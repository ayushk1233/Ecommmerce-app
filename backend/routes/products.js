const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const router = express.Router();

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
    
    // Search in name and description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    console.log('Applying filter:', filter);
    
    // Check database connection
    try {
      const dbState = mongoose.connection.readyState;
      if (dbState !== 1) {
        const dbStatus = {
          0: 'disconnected',
          1: 'connected',
          2: 'connecting',
          3: 'disconnecting'
        };
        console.error('Database connection issue:', dbStatus[dbState] || 'unknown state');
        return res.status(503).json({ 
          message: 'Database is not available',
          status: dbStatus[dbState] || 'unknown state'
        });
      }
    } catch (dbError) {
      console.error('Error checking database connection:', dbError);
      return res.status(503).json({ message: 'Unable to verify database connection' });
    }
    
    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
    console.log(`Found ${products.length} products`);
    
    // Add detailed logging
    if (products.length === 0) {
      console.log('No products found with filter:', filter);
    } else {
      console.log('First product example:', products[0]);
    }
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Send more detailed error information
    res.status(500).json({ 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      type: error.name
    });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    console.log('Creating product with data:', req.body);
    
    // Validate required fields
    const { name, description, price, category, image } = req.body;
    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['name', 'description', 'price', 'category', 'image'],
        received: req.body
      });
    }

    // Validate price is a positive number
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ 
        message: 'Price must be a positive number',
        received: price
      });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      inStock: req.body.inStock !== false // default to true unless explicitly set to false
    });

    console.log('Saving product:', product);
    const savedProduct = await product.save();
    console.log('Product saved successfully:', savedProduct);
    
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ 
      message: 'Error saving product',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;