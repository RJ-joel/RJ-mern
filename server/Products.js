const mongoose = require('mongoose');

const PostalServiceSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    trackingId: String,
    status: {
        type: String,
        enum: ['Pending', 'In Transit', 'Delivered'],
        default: 'Pending'
    }
});

const PostalServiceModel = mongoose.model("PostalService", PostalServiceSchema, "PostalService");

module.exports = PostalServiceModel;
