const validator = require('validator');
const UserModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const { setUser } = require('../services/auth.services');

module.exports.handleUserLoginWithPassword = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ message: "Please provide a valid email" });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ message: "Password must be 6 character long." });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "No User found." });
        }

        if (user.providers[0].provider !== "local") {
            return res.status(400).json({ message: "Please try login with google or github." });
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
        console.error(error);
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
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Please try login, account already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 7);
        const newUser = await UserModel.create({
            email,
            username,
            password: hashedPassword,
            providers: [{ provider: "local" }]
        });

        const token = setUser(newUser._id);
        res.status(200).json({
            token,
            message: "Signup successful"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong, please try again later" });
    }
}