const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Google OAuth
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // Find or create user
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        name: payload.name,
        email: payload.email,
        role: "buyer",
        address: {
          houseNo: "",
          landmark: "",
          area: "",
          district: "",
          state: "",
          pincode: "",
        }, // <-- Always set address object
      });
      await user.save();
    }

    // Issue JWT
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token: jwtToken,
      userId: user._id, // <-- Add this line!
      email: user.email,
      name: user.name,
      role: user.role,
      address: user.address,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({ message: "Google authentication failed" });
  }
});

module.exports = router;
