const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: {
        type: String,
    },
    profilePicture: {
        type: String
    },
    providers: [
        {
            provider: { 
                type: String, 
                required: true, 
                enum: ["local", "github", "google"],
                default: "local"
             },
            providerId: { type: String, unique: true }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);