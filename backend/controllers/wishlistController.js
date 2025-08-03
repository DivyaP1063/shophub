
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

const wishlistController = {
  // Get user's wishlist
  getWishlist: async (req, res) => {
    try {
      const wishlist = await Wishlist.findOne({ user: req.user._id })
        .populate({
          path: 'products',
          populate: {
            path: 'seller',
            select: 'name email'
          }
        });

      if (!wishlist) {
        return res.json({ products: [] });
      }

      res.json(wishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Add product to wishlist
  addToWishlist: async (req, res) => {
    try {
      const { product: productId } = req.body;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      let wishlist = await Wishlist.findOne({ user: req.user._id });

      if (!wishlist) {
        wishlist = new Wishlist({ user: req.user._id, products: [] });
      }

      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }

      await wishlist.populate({
        path: 'products',
        populate: {
          path: 'seller',
          select: 'name email'
        }
      });

      res.json(wishlist);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Remove product from wishlist
  removeFromWishlist: async (req, res) => {
    try {
      const wishlist = await Wishlist.findOne({ user: req.user._id });
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }

      wishlist.products = wishlist.products.filter(
        productId => productId.toString() !== req.params.productId
      );

      await wishlist.save();
      res.json({ message: 'Product removed from wishlist' });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = wishlistController;
