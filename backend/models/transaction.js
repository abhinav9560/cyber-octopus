const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transaction = mongoose.Schema(
  {
    type: {
      type: String, //paypal //stripe
      default: "",
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    amount: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: 1,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("Transaction", Transaction);
