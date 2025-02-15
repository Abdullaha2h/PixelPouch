const mongoose = require('mongoose');


const ownerSchema = mongoose.Schema({
    fullname: { type: String},
    email: { type: String, unique: true},
    password: { type: String },
    product: { type: Array, default: [] },
    picture: { type: String, default: "default.jpg" },
    gstin: { type: String}
});

module.exports = mongoose.model("owner",ownerSchema)