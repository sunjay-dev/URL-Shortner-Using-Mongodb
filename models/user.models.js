const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        sparse: true
    },
    profilePicture: {
        type: String
    },
    providers: [
        {
            provider: { type: String, required: true, enum: ["github", "google"] },
            providerId: { type: String, required: true, unique: true }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
