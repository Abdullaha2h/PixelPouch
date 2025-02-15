const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: Buffer,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    bgcolor: { type: String, default: "#FFFFFF" },
    panelcolor: { type: String, default: "#FFFFFF" },
    textcolor: { type: String, default: "#000000" },
    createdAt: { type: Date, default: Date.now },
    popularity: { type: Number, default: 0 }     // Default popularity score is 0
}); 

module.exports = mongoose.model("product",productSchema)