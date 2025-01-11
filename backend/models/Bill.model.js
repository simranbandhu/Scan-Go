const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    total_amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
