const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const Order = require("../models/Order");
//in index.js
//const webhookRoutes = require("./routes/webhookRoutes");
//app.use("/api/webhook", webhookRoutes);

router.post("/", async (req, res) => {
  console.log("Webhook hit!");
  const intentName = req.body.queryResult?.intent?.displayName;
  const parameters = req.body.queryResult?.parameters || {};

  let responseText = "";

  try {
    if (intentName === "OrderStatus") {
      // Fetch most recent order with product details populated
      const recentOrder = await Order.findOne()
        .sort({ createdAt: -1 })
        .populate("items.product")
        .exec();

      if (recentOrder) {
        const products = recentOrder.items.map(
          (item) => `${item.product.title} (x${item.quantity})`
        );
        const productList = products.join(", ");
        responseText = `Your most recent order: ${productList}\nStatus: *${recentOrder.status}*\nTotal Amount: ₹${recentOrder.totalAmount}`;
      } else {
        responseText = "You have no recent orders.";
      }

    } else if (intentName === "ProductQuery") {
      const queryObj = {};

      if (parameters.category) {
        queryObj.category = parameters.category;
      }

      if (parameters.price) {
        queryObj.price = { $lte: Number(parameters.price) };
      }

      const products = await Product.find(queryObj);

      if (products.length === 0) {
        responseText = "Sorry, no products matched your criteria.";
      } else if (products.length === 1) {
        const prod = products[0];
        responseText = `Product: ${prod.title}\nPrice: ₹${prod.price}\nDescription: ${prod.description}\nSizes: ${prod.size}\nStock: ${prod.stock > 0 ? prod.stock : "Out of stock"}`;
      } else {
        responseText = `Found ${products.length} products:\n`;
        products.forEach((prod) => {
          responseText += `\n- ${prod.title}: ₹${prod.price}, Stock: ${prod.stock > 0 ? prod.stock : "Out of stock"}`;
        });
      }

    } else {
      responseText = "Sorry, I didn't understand that. Could you please rephrase?";
    }

    res.json({
      fulfillmentText: responseText,
      source: "webhookroutes",
    });

  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({
      fulfillmentText: "Sorry, something went wrong on our side.",
      source: "webhookroutes",
    });
  }
});

module.exports = router;
