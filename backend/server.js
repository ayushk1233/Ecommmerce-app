// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- CORS Setup ---
const allowedOrigins = [
  'https://bingee-buyy.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    console.log('=== CORS DEBUG ===');
    console.log('Incoming origin:', origin);
    console.log('Allowed origins:', allowedOrigins);
    
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      console.log('✅ Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('❌ Origin blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Manual CORS headers as backup
app.use((req, res, next) => {
  console.log('Adding manual CORS headers');
  res.header('Access-Control-Allow-Origin', 'https://bingee-buyy.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return res.sendStatus(200);
  }
  next();
});

// --- Middleware ---
app.use(express.json());

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// --- Default route ---
app.get('/', (req, res) => {
  res.send('E-commerce Backend is running.');
});

// --- Connect to MongoDB ---
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});