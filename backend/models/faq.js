const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FAQ = mongoose.Schema(
  {
    question: {
      type: String,
      default: "",
      trim: true,
    },
    answer: {
      type: String,
      default: "",
      trim: true,
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

module.exports = mongoose.model("FAQ", FAQ);
