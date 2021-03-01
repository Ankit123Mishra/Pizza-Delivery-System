const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true },
    linkName: { type: String, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model("Categories", categorySchema);
