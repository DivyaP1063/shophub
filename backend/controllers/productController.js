
const Product = require('../models/Product');

const productController = {
  // Get all products with filtering and pagination
  getAllProducts: async (req, res) => {
    try {
      const {
        search,
        category,
        price,
        size,
        sort,
        page = 1,
        limit = 20,
        seller
      } = req.query;

      let query = {};

      // Search filter
      if (search) {
        query.$text = { $search: search };
      }

      // Category filter
      if (category && category !== 'all') {
        query.category = category;
      }

      // Size filter
      if (size && size !== 'all') {
        query.size = { $in: [size] };
      }

      // Price filter
      if (price && price !== 'all') {
        const priceRanges = {
          '0-50': { $lte: 50 },
          '50-100': { $gte: 50, $lte: 100 },
          '100-200': { $gte: 100, $lte: 200 },
          '200-500': { $gte: 200, $lte: 500 },
          '500+': { $gte: 500 }
        };
        if (priceRanges[price]) {
          query.price = priceRanges[price];
        }
      }

      // Seller filter
      if (seller) {
        query.seller = seller;
      }

      // Sort options
      let sortOption = {};
      switch (sort) {
        case 'price-low':
          sortOption = { price: 1 };
          break;
        case 'price-high':
          sortOption = { price: -1 };
          break;
        case 'popular':
          sortOption = { createdAt: -1 }; // Placeholder for popularity
          break;
        case 'rating':
          sortOption = { createdAt: -1 }; // Placeholder for rating
          break;
        default:
          sortOption = { createdAt: -1 };
      }

      const products = await Product.find(query)
        .populate('seller', 'name email')
        .sort(sortOption)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Product.countDocuments(query);

      res.json({
        products,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Get single product
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
        .populate('seller', 'name email');
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Create product
  createProduct: async (req, res) => {
    try {
      const { title, description, price, category, size, stock } = req.body;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'At least one image is required' });
      }

      const images = req.files.map(file => file.path);
      const sizeArray = Array.isArray(size) ? size : [size];

      const product = new Product({
        seller: req.user._id,
        title,
        description,
        price: parseFloat(price),
        images,
        category,
        size: sizeArray,
        stock: parseInt(stock)
      });

      await product.save();
      await product.populate('seller', 'name email');

      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Update product
  updateProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.seller.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this product' });
      }

      const { title, description, price, category, size, stock } = req.body;
      
      // Update fields
      if (title) product.title = title;
      if (description) product.description = description;
      if (price) product.price = parseFloat(price);
      if (category) product.category = category;
      if (size) product.size = Array.isArray(size) ? size : [size];
      if (stock !== undefined) product.stock = parseInt(stock);

      // Update images if new ones are uploaded
      if (req.files && req.files.length > 0) {
        product.images = req.files.map(file => file.path);
      }

      await product.save();
      await product.populate('seller', 'name email');

      res.json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Delete product
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.seller.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this product' });
      }

      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = productController;
