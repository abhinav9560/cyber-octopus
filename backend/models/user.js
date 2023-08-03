const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.Schema(
  {
    fName: {
      type: String,
      default: "",
      trim: true,
    },
    lName: {
      type: String,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
      validate: {
        validator: async function (email) {
          const user = await this.constructor.findOne({ email });
          if (user) {
            if (this.id === user.id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: (props) => "This email is already in use",
      },
      required: [true, "User email required"],
    },
    mobile: {
      type: String,
      default: "",
      trim: true,
    },
    technology: [{ type: Schema.Types.ObjectId, ref: "Technology" }],
    image: {
      type: String,
      default: "dummy_user.png",
      trim: true,
    },
    experience: {
      type: String,
      default: "",
      trim: true,
    },
    work: {
      type: String,
      default: "",
      trim: true,
    },
    wallet: {
      type: Number,
      default: 0,
    },
    roleInCompany: {
      type: Number,
      default: 1,
    },
    otp: {
      type: Number,
      default: null,
      trim: true,
    },
    otpStatus: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      default: "",
      trim: true,
      select: false,
    },
    role: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
    isTwoFactor: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("User", User);
