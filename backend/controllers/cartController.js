
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const cartController = {
  // Get user's cart
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user._id })
        .populate({
          path: 'items.product',
          populate: {
            path: 'seller',
            select: 'name email'
          }
        });

      if (!cart) {
        return res.json({ items: [] });
      }

      res.json(cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Add item to cart
  addToCart: async (req, res) => {
    try {
      const { product: productId, quantity } = req.body;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }

      let cart = await Cart.findOne({ user: req.user._id });

      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
      }

      const existingItemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
      await cart.populate({
        path: 'items.product',
        populate: {
          path: 'seller',
          select: 'name email'
        }
      });

      res.json(cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Update cart item quantity
  updateCartItem: async (req, res) => {
    try {
      const { product: productId, quantity } = req.body;

      const cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }

      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }

      await cart.save();
      await cart.populate({
        path: 'items.product',
        populate: {
          path: 'seller',
          select: 'name email'
        }
      });

      res.json(cart);
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Remove item from cart
  removeFromCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      cart.items = cart.items.filter(
        item => item.product.toString() !== req.params.productId
      );

      await cart.save();
      res.json({ message: 'Item removed from cart' });
    } catch (error) {
      console.error('Error removing from cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Clear cart
  clearCart: async (req, res) => {
    try {
      await Cart.findOneAndUpdate(
        { user: req.user._id },
        { items: [] }
      );

      res.json({ message: 'Cart cleared' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = cartController;
