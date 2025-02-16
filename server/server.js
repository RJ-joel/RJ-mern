const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./User'); // Ensure correct import

dotenv.config();

// Start App
const app = express();
app.use(cors());
app.use(express.json());

// Check if UserModel is correctly imported
console.log("UserModel:", UserModel);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Company')
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

// API Endpoints
app.get('/', (req, res) => {
    res.send("Welcome to Express server");
});

// Register API Route
app.post('/register', async (req, res) => {
    try {
        await UserModel.create(req.body);
        res.json('Data Saved Successfully');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Start Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Express Server started on port ${PORT}`);
});
