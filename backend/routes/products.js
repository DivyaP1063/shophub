
const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const productController = require('../controllers/productController');
const { auth, sellerAuth } = require('../middleware/auth');

const router = express.Router();

// Configure multer with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: process.env.CLOUDINARY_FOLDER || 'shophub',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }]
  }
});

const upload = multer({ storage });

// Get all products with filtering and pagination
router.get('/', productController.getAllProducts);

// Get single product
router.get('/:id', productController.getProductById);

// Create product (sellers only)
router.post('/', auth, sellerAuth, upload.array('images', 5), productController.createProduct);

// Update product (sellers only, own products)
router.put('/:id', auth, sellerAuth, upload.array('images', 5), productController.updateProduct);

// Delete product (sellers only, own products)
router.delete('/:id', auth, sellerAuth, productController.deleteProduct);

module.exports = router;
