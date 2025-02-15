require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

// Get MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing! Check environment variables.");
    process.exit(1);
}

mongoose.connect(`${MONGO_URI}/pixelpouch`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => dbgr("✅ Connected to MongoDB"))
.catch((err) => dbgr("❌ Error connecting to MongoDB:", err));
