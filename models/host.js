const mongoose = require('mongoose');
require('dotenv').config();

const mongoDbUrl = process.env.MONGODB_URL;

mongoose.connect(mongoDbUrl, { useNewUrlParser: true });

const hostSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    locationLatitude: { type: String, required: true },
    locationLongitude: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: Boolean, default: true },
    available: { type: Number, default: true },
    country: { type: String, required: true },
});

const User = mongoose.model('Host', hostSchema);

module.exports = User;
