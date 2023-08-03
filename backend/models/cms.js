const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CMS = mongoose.Schema(
  {
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
    slug: {
      type: String,
      default: "",
      trim: true,
      unique: true,
    },
    contentEN: {
      type: String,
      default: "",
      trim: true,
    },
    contentDE: {
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

// CMS.pre("findOneAndUpdate", function () {
//   this.options.runValidators = true;
// });

module.exports = mongoose.model("CMS", CMS);
