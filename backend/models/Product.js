const mongoose = require("mongoose");

const specificationSchema = new mongoose.Schema(
  {
    Generic: { type: String },
    ParticulateMatter: { type: String },
    VOC: { type: String },
    Humidity: { type: String },
    Temperature: { type: String },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    features: [
      {
        type: String,
      },
    ],
    specification: specificationSchema,
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
productSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
