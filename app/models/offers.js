const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priceAdjustment: { type: Number, required: true },
    maxDiscount: { type: Number, required: true },
    isPercentage: { type: Boolean, default: false },
    couponCode: { type: String, required: true },
    image: { type: String }
});

module.exports = mongoose.model("Offer", offerSchema);