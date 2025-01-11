const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    phone_number: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    otpExpiresIn: {
      type: Date,
      default: Date.now(),
      get: (otpExpiresIn) => otpExpiresIn.getTime(),
      set: (otpExpiresIn) => new Date(otpExpiresIn) + 15 * 60 * 1000,
    },
    activeBill: {
      type: mongoose.Schema.ObjectId,
      ref: "Bill",
      default: null,
    },
    bills: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Bill",
      },
    ],
  },
  {
    virtuals: true,
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
