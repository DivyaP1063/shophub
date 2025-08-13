const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const User = require("./models/User");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const orderRoutes = require("./routes/orders");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "https://shophub-frontend.onrender.com", // your deployed frontend
  "http://localhost:8080", // local dev (optional)
];


// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/shophub", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);

app.put("/api/user/address", async (req, res) => {
  try {
    const { userId, address } = req.body;

    // Validate presence
    if (!userId || !address) {
      return res
        .status(400)
        .json({ message: "userId and address are required." });
    }

    console.log("Received address update:", req.body);

    // Validate structure
    const requiredFields = [
      "houseNo",
      "landmark",
      "area",
      "district",
      "state",
      "pincode",
    ];
    for (const field of requiredFields) {
      if (!address[field] || typeof address[field] !== "string") {
        return res
          .status(400)
          .json({ message: `Address field '${field}' is missing or invalid.` });
      }
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { address },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: "Address updated successfully.",
      address: user.address,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update address.",
      error: error.message,
    });
  }
});

app.put("/api/user/update", async (req, res) => {
  try {
    const { userId, name, email, address } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required." });
    }

    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (address) {
      const requiredFields = [
        "houseNo",
        "landmark",
        "area",
        "district",
        "state",
        "pincode",
      ];
      for (const field of requiredFields) {
        if (!address[field] || typeof address[field] !== "string") {
          return res.status(400).json({
            message: `Address field '${field}' is missing or invalid.`,
          });
        }
      }
      updateData.address = address;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: "User updated successfully.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user.",
      error: error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
