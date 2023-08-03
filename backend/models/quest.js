const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Quest = mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    questType: {
      type: Number,
      default: 1,
      enum: [1, 2],   //1 = urgent 2 =standard
    },
    documents: [],
    isLiveSession: {
      type: Boolean,
      default: false,
    },
    liveSession: {
      type: Date,
      default: new Date(),
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    expertId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    displayId: {
      type: Number,
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

Quest.plugin(AutoIncrement, { inc_field: "displayId" });

module.exports = mongoose.model("Quest", Quest);
