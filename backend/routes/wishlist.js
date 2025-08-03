
const express = require('express');
const wishlistController = require('../controllers/wishlistController');
const { auth, buyerAuth } = require('../middleware/auth');

const router = express.Router();

// Get user's wishlist
router.get('/', auth, buyerAuth, wishlistController.getWishlist);

// Add product to wishlist
router.post('/', auth, buyerAuth, wishlistController.addToWishlist);

// Remove product from wishlist
router.delete('/:productId', auth, buyerAuth, wishlistController.removeFromWishlist);

module.exports = router;
