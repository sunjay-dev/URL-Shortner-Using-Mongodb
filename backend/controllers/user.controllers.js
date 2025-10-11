const validator = require('validator');
const UserModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const { setUser } = require('../services/auth.services');

module.exports.handleLoginUserWithPassword = async (req, res) => {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please enter valid email" });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ message: "Password must be 6 character long." });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "No User found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password." });
        }

        const token = setUser(user._id);
        res.status(200).json({
            token,
            message: "Login successful"
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong, please try again later" });
    }
}

module.exports.handleUserSignUpWithPassword = async (req, res) => {
    const { username, email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please enter valid email" });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ message: "Password must be 6 character long." });
    }

    if (!username || username.length < 2) {
        return res.status(400).json({ message: "Username must be 2 character long." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 7);

        const result = await UserModel.findOneAndUpdate(
            { email },
            { $setOnInsert: { email, username, password: hashedPassword } },
            { new: true, upsert: true, rawResult: true }
        );

        if (result.lastErrorObject.updatedExisting) {
            return res.status(400).json({ message: "Please try login, account already exist." });

        }
        const token = setUser(result.value._id);
        res.status(200).json({
            token,
            message: "Login successful"
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong, please try again later" });
    }
}