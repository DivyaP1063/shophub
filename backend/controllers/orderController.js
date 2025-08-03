
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const crypto = require("crypto");
const razorpay = require("../config/razorpay"); 


const orderController = {
  // Create order from cart
  createOrder: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user._id }).populate(
        "items.product"
      );

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      let totalAmount = 0;
      const orderItems = [];

      for (const item of cart.items) {
        const product = item.product;

        if (product.stock < item.quantity) {
          return res.status(400).json({
            message: `Insufficient stock for ${product.title}`,
          });
        }

        orderItems.push({
          product: product._id,
          quantity: item.quantity,
          price: product.price,
        });

        totalAmount += product.price * item.quantity;
      }

      // Razorpay expects amount in paise
      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: "INR",
        receipt: `order_rcptid_${Date.now()}`,
        payment_capture: 1,
      });

      const order = new Order({
        user: req.user._id,
        items: orderItems,
        totalAmount,
        status: "pending",
        razorpayOrderId: razorpayOrder.id,
      });

      await order.save();

      // Do not reduce stock or clear cart here until payment is confirmed

      await order.populate([
        {
          path: "items.product",
          populate: {
            path: "seller",
            select: "name email",
          },
        },
        {
          path: "user",
          select: "name email",
        },
      ]);

      res.status(201).json({
        order,
        razorpayOrder: {
          id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Get user's orders
  getUserOrders: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id })
        .populate({
          path: "items.product",
          populate: {
            path: "seller",
            select: "name email", // populate seller info
          },
        })
        .populate({
          path: "user", // also include the buyer's own data if needed
          select: "name email",
        })
        .sort({ createdAt: -1 });
  
      res.json(orders);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Get seller's orders
  getSellerOrders: async (req, res) => {
    try {
      const productIds = await Product.find({ seller: req.user._id }).distinct("_id");
  
      const orders = await Order.find({
        "items.product": { $in: productIds },
      })
        .populate([
          {
            path: "items.product",
            populate: {
              path: "seller",
              select: "name email", // seller info
            },
          },
          {
            path: "user",
            select: "name email", // buyer info
          },
        ])
        .sort({ createdAt: -1 });
  
      res.json(orders);
    } catch (error) {
      console.error("Error fetching seller orders:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  // Update order status
  updateOrderStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const { orderId } = req.params;

      const order = await Order.findById(orderId).populate("items.product");

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Check if seller owns at least one product in the order
      const sellerProducts = await Product.find({ seller: req.user._id });
      const sellerProductIds = sellerProducts.map((p) => p._id.toString());

      const hasSellerProduct = order.items.some((item) =>
        sellerProductIds.includes(item.product._id.toString())
      );

      if (!hasSellerProduct) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this order" });
      }

      order.status = status;
      await order.save();

      await order.populate([
        {
          path: "items.product",
          populate: {
            path: "seller",
            select: "name email",
          },
        },
        {
          path: "user",
          select: "name email",
        },
      ]);

      res.json(order);
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  verifyPayment: async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ message: "Invalid signature" });
      }

      const order = await Order.findOne({
        razorpayOrderId: razorpay_order_id,
      }).populate("items.product");

      if (!order) return res.status(404).json({ message: "Order not found" });

      // Update stock and clear cart only after payment verification
      for (const item of order.items) {
        const product = await Product.findById(item.product._id);
        product.stock -= item.quantity;
        await product.save();
      }

      order.status = "paid";
      order.razorpayPaymentId = razorpay_payment_id;
      await order.save();

      // Clear user's cart
      const cart = await Cart.findOne({ user: order.user });
      if (cart) {
        cart.items = [];
        await cart.save();
      }

      res.json({ message: "Payment verified and order updated", order });
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = orderController;
