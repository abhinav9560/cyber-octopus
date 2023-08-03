const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Law = mongoose.Schema(
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



module.exports = mongoose.model("Law", Law);
