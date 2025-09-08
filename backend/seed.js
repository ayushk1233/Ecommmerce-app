const mongoose = require('mongoose');
const Product = require('./models/Product');
const fs = require('fs');
require('dotenv').config();

// Load sample products
const sampleProducts = JSON.parse(fs.readFileSync('./sample-products.json', 'utf8'));

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} sample products added`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });