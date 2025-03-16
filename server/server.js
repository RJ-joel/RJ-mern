const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PostalServiceModel = require('./products'); // Corrected import based on your model filename
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

// Create - Add a new postal record
app.post('/addParcel', async (req, res) => {
    try {
        await PostalServiceModel.create(req.body);
        res.json({ message: 'Parcel Added Successfully' });
    } catch (error) {
        res.json(error);
    }
});

// Read All - Get all parcels
app.get('/viewParcels', async (req, res) => {
    try {
        const records = await PostalServiceModel.find();
        res.json(records);
    } catch (error) {
        res.json(error);
    }
});

// Read By ID - Get a specific parcel by ID
app.get('/findParcel/:id', async (req, res) => {
    try {
        const record = await PostalServiceModel.findById(req.params.id);
        res.json(record);
    } catch (error) {
        res.json(error);
    }
});

// Update - Edit a parcel's details
app.put('/editParcel/:id', async (req, res) => {
    try {
        const updatedParcel = await PostalServiceModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedParcel) {
            return res.send('Parcel not found');
        }
        res.json({ message: 'Parcel Updated Successfully' });
    } catch (err) {
        res.json(err);
    }
});

// Delete - Remove a parcel
app.delete('/deleteParcel/:id', async (req, res) => {
    try {
        await PostalServiceModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Parcel Deleted Successfully!' });
    } catch (error) {
        res.json(error);
    }
});


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
