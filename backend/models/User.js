const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const addressSchema = new mongoose.Schema(
  {
    houseNo: { type: String, trim: true },
    landmark: { type: String, trim: true },
    area: { type: String, trim: true },
    district: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },
  },
  { _id: false } // Prevent creating separate _id for address
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false, // <-- Change required to false
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer",
    },
    address: {
      type: addressSchema,
      default: null,
    },
    orders: [
      {
        // Orders placed by the buyer
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    sales: [
      {
        // Orders that include the seller's products
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
