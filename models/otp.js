const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    
    otp:{
        type: String,
        required: true,
    },
     user_ID:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
}, {timestamps: true})

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;