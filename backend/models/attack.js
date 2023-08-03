const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Attack = mongoose.Schema(
  {
    country: {
      type: String,
      default: "",
      trim: true,
    },
    titleEN: {
      type: String,
      default: "",
      trim: true,
    },
    titleDE: {
      type: String,
      default: "",
      trim: true,
    },
    descriptionEN: {
      type: String,
      default: "",
      trim: true,
    },
    descriptionDE: {
      type: String,
      default: "",
      trim: true,
    },
    link: {
      type: String,
      default: "",
      trim: true,
    },
    lat: {
      type: String,
      default: "",
    },
    lng: {
      type: String,
      default: "",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
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

Attack.index({ location: "2dsphere" });

module.exports = mongoose.model("Attack", Attack);
