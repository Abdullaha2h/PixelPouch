const mongoose = require('mongoose');
const product = require('./product-model');


const userSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref:product }],
  
    orders: { type: Array, default: [] },
    contactNumber: { type: Number },
    picture: { type: String, default: "default.jpg" }
});

module.exports = mongoose.model("user",userSchema)