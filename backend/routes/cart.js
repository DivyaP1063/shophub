
const express = require('express');
const cartController = require('../controllers/cartController');
const { auth, buyerAuth } = require('../middleware/auth');

const router = express.Router();

// Get user's cart
router.get('/', auth, buyerAuth, cartController.getCart);

// Add item to cart
router.post('/', auth, buyerAuth, cartController.addToCart);

// Update cart item quantity
router.put('/', auth, buyerAuth, cartController.updateCartItem);

// Remove item from cart
router.delete('/:productId', auth, buyerAuth, cartController.removeFromCart);

// Clear cart
router.delete('/', auth, buyerAuth, cartController.clearCart);

module.exports = router;
