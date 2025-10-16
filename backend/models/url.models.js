const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        default: "Untitled"
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    visitHistory: [{
        timestamps: { type: Number },
        _id: false,
        ipaddress: { type: String },
        browser: { type: String },
        os: { type: String },
        device: { type: String },
        country: { type: String },
        city: { type: String },
        region: { type: String }
    }]
}, { timestamps: true })

module.exports = mongoose.model("url", urlSchema);