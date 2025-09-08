# E-commerce Application

A full-stack e-commerce application built with Next.js, Express.js, and MongoDB.

## Features

- 🛍️ Product listing and details
- 🛒 Shopping cart functionality
- 👤 User authentication
- 🔐 Admin panel for product management
- 📱 Responsive design
- 🔍 Product search and filtering
- 💳 Order management

## Project Structure

```
ecommerce/
├── frontend/         # Next.js frontend application
├── backend/          # Express.js backend API
└── README.md        # This file
```

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (v4.4 or higher)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_here
```

4. Seed the database with sample products:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm run dev
```

The backend server will run on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend application will run on http://localhost:3000

## Dependencies

### Backend Dependencies
- express: Web framework for Node.js
- mongoose: MongoDB object modeling
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- cors: Cross-origin resource sharing
- dotenv: Environment variable management

### Frontend Dependencies
- next: React framework
- react: UI library
- axios: HTTP client
- tailwindcss: CSS framework
- typescript: Type checking
- js-cookie: Cookie handling
- lucide-react: Icon library

## API Routes

### Authentication
- POST `/api/auth/signup`: Register new user
- POST `/api/auth/login`: User login
- GET `/api/auth/me`: Get current user

### Products
- GET `/api/products`: List all products
- GET `/api/products/:id`: Get single product
- POST `/api/products`: Create product (admin only)
- PUT `/api/products/:id`: Update product (admin only)
- DELETE `/api/products/:id`: Delete product (admin only)

### Cart
- GET `/api/cart`: Get user's cart
- POST `/api/cart/add`: Add item to cart
- PUT `/api/cart/update/:productId`: Update cart item quantity
- DELETE `/api/cart/:productId`: Remove item from cart

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production

#### Backend
```bash
cd backend
npm run build
```

#### Frontend
```bash
cd frontend
npm run build
```

## Deploying to GitHub

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Choose a repository name
   - Leave it as a public repository
   - Don't initialize with README (since we already have one)
   - Click "Create repository"

2. Initialize and push to GitHub:
   ```bash
   # Initialize git repository
   git init

   # Add all files to git
   git add .

   # Commit all files
   git commit -m "Initial commit"

   # Add GitHub repository as remote
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

   # Push to GitHub
   git push -u origin main
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js Documentation
- Express.js Documentation
- MongoDB Documentation
- TailwindCSS Documentation
