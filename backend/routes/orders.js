const express = require("express");
const orderController = require("../controllers/orderController");
const { auth, buyerAuth, sellerAuth } = require("../middleware/auth");

const router = express.Router();

// Create order from cart (buyers only)
router.post("/user", auth, buyerAuth, orderController.createOrder);

// Get user's orders (buyers only)
router.get("/user", auth, buyerAuth, orderController.getUserOrders);

// Get seller's orders (sellers only)
router.get("/seller", auth, sellerAuth, orderController.getSellerOrders);

// Update order status (sellers only)
router.put(
  "/:orderId/status",
  auth,
  sellerAuth,
  orderController.updateOrderStatus
);

// ✅ Add this: Verify Razorpay payment (buyers only)
router.post("/verify-payment", auth, buyerAuth, orderController.verifyPayment);

module.exports = router;
