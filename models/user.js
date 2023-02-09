const mongoose = require('mongoose');
require('dotenv').config();

const mongoDbUrl = process.env.MONGODB_URL;

mongoose.connect(mongoDbUrl, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    dob: {
        type: Date,
        required: false
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    country: { type: String, required: true },

    otp: {
        type: String,
    },
    otpExpire: {
        type: Date,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
