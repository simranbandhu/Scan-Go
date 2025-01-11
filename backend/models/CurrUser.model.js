const mongoose = require("mongoose");

const currUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    curr_user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      default: null,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

const CurrUser = mongoose.model("CurrUser", currUserSchema);

module.exports = CurrUser;
