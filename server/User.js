const mongoose = require('mongoose');

// Define schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    location: String
});

// Create model object (❌ Remove `new`)
const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;  // ✅ Correct export
