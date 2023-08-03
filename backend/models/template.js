const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Template = mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },
    slug: {
      type: String,
      default: "",
      trim: true,
      validate: {
        validator: async function (slug) {
          const user = await this.constructor.findOne({ slug });
          if (user) {
            if (this.id === user.id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: (props) => "This slug is already in use",
      },
    },
    content: {
      type: String,
      default: "",
      trim: true,
    },
    subject: {
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

module.exports = mongoose.model("Template", Template);
