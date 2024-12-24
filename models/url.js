const mongoose = require('mongoose');
const User = require('./user');
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required:true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    owner:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    visitHistory:[{ timestamps: {type: Number}, _id: false}]
}, {timestamps: true})

const Store_Url = mongoose.model("url", urlSchema);

module.exports = Store_Url;