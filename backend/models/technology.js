const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Technology = mongoose.Schema(
  {
    nameEN: {
      type: String,
      default: "",
      trim: true,
      validate: {
        validator: async function (nameEN) {
          const user = await this.constructor.findOne({ nameEN });
          if (user) {
            if (this.id === user.id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: (props) => "This name (en) is already in use",
      },
    },
    nameDE: {
      type: String,
      default: "",
      trim: true,
      validate: {
        validator: async function (nameDE) {
          const user = await this.constructor.findOne({ nameDE });
          if (user) {
            if (this.id === user.id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: (props) => "This name (gr) is already in use",
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

module.exports = mongoose.model("Technology", Technology);
