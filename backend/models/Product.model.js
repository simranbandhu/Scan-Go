const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    bill_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Bill",
      required: true,
    },
    product_name: {
      type: String,
      required: [true, "A product must have a name"],
    },
    product_description: {
      type: String,
      required: [true, "A product must have description"],
    },
    unique_id: {
      type: String,
      required: [true, "A product must have a unique id"],
    },
    cost_price: {
      type: Number,
      required: [true, "A product must have a cost price"],
      default: 0,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
