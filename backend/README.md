
# ShopHub Backend

A complete backend for the ShopHub e-commerce platform built with Express.js, MongoDB, and Cloudinary.

## Features

- User authentication (JWT)
- Product management with image upload
- Shopping cart functionality
- Wishlist management
- Order processing
- Role-based access control (buyers and sellers)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example` and fill in your credentials:
```bash
cp .env.example .env
```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## Environment Variables

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `CLOUDINARY_FOLDER`: Folder name for uploaded images
- `PORT`: Server port (default: 5000)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (sellers only)
- `PUT /api/products/:id` - Update product (sellers only)
- `DELETE /api/products/:id` - Delete product (sellers only)

### Cart
- `GET /api/cart` - Get user's cart (buyers only)
- `POST /api/cart` - Add item to cart (buyers only)
- `PUT /api/cart` - Update cart item (buyers only)
- `DELETE /api/cart/:productId` - Remove item from cart (buyers only)
- `DELETE /api/cart` - Clear cart (buyers only)

### Wishlist
- `GET /api/wishlist` - Get user's wishlist (buyers only)
- `POST /api/wishlist` - Add to wishlist (buyers only)
- `DELETE /api/wishlist/:productId` - Remove from wishlist (buyers only)

### Orders
- `POST /api/orders/user` - Create order from cart (buyers only)
- `GET /api/orders/user` - Get user's orders (buyers only)
- `GET /api/orders/seller` - Get seller's orders (sellers only)
- `PUT /api/orders/:orderId/status` - Update order status (sellers only)

## Technologies Used

- Express.js
- MongoDB with Mongoose
- Cloudinary for image storage
- JWT for authentication
- Multer for file uploads
- bcryptjs for password hashing
