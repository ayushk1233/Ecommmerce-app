# E-commerce Application

A full-stack e-commerce application built with Next.js, Express.js, and MongoDB.

## 🌐 Live Deployment

- Frontend: [https://ecommmerce-821qbwtma-ayush-kumars-projects-670ebe9f.vercel.app](https://ecommmerce-821qbwtma-ayush-kumars-projects-670ebe9f.vercel.app)
- Backend API: [https://ecommmerce-app-4c1y.onrender.com](https://ecommmerce-app-4c1y.onrender.com)

### Important Note for Deployment
If you're deploying your own version:
1. Update the FRONTEND_URL environment variable in your Render dashboard to match your Vercel deployment URL
2. Update the NEXT_PUBLIC_API_URL in your Vercel deployment to match your Render backend URL
3. Update the allowedOrigins array in backend/server.js with your frontend URLs

## 🧪 API Testing Links

Test these endpoints using Postman or curl:

### Authentication
- Register: `POST https://ecommerce-app-1-t94l.onrender.com/api/auth/signup`
- Login: `POST https://ecommerce-app-1-t94l.onrender.com/api/auth/login`
- Get User: `GET https://ecommerce-app-1-t94l.onrender.com/api/auth/me`

### Products
- List Products: `GET https://ecommerce-app-1-t94l.onrender.com/api/products`
- Get Product: `GET https://ecommerce-app-1-t94l.onrender.com/api/products/:id`
- Create Product: `POST https://ecommerce-app-1-t94l.onrender.com/api/products`
- Update Product: `PUT https://ecommerce-app-1-t94l.onrender.com/api/products/:id`
- Delete Product: `DELETE https://ecommerce-app-1-t94l.onrender.com/api/products/:id`

### Cart
- Get Cart: `GET https://ecommerce-app-1-t94l.onrender.com/api/cart`
- Add to Cart: `POST https://ecommerce-app-1-t94l.onrender.com/api/cart/add`
- Update Cart Item: `PUT https://ecommerce-app-1-t94l.onrender.com/api/cart/update/:productId`
- Remove from Cart: `DELETE https://ecommerce-app-1-t94l.onrender.com/api/cart/:productId`

## 🚀 Features

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

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb+srv://your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
PORT=3001
FRONTEND_URL=http://localhost:3000
```

For production, you'll need to change these values:
```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_secret
PORT=3001
FRONTEND_URL=https://your-frontend-domain.com
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
