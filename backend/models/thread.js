const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Thread = mongoose.Schema(
  {
    content: {
      type: String,
      default: "",
      trim: true,
    },
    documents: [],
    questId: {
      type: Schema.Types.ObjectId,
      ref: "Quest",
      default: null,
    },
    threadBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    threadId: {
      type: Number,
    },
    threadType: {
      type: Number,
      default: 1,
      enum: [1, 2], // 1 for expert 2 for customer
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

Thread.plugin(AutoIncrement, { inc_field: "threadId" });

module.exports = mongoose.model("Thread", Thread);
