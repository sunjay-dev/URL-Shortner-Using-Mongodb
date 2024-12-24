const Store_User = require('../models/user.js');
const Store_otp = require('../models/otp.js');
const { setUser, getUser } = require('../services/auth.js');
const { sendemail } = require('../services/emailsend.js');
const mongoose = require('mongoose');

async function handleUserSignup(req, res) {

    const { name, email, password } = req.body;

    const value = await Store_User.findOne({ email: email });
    if (value) {
        return res.render('signup&login', { error: "email already exist" });
    }
    const my_User = await Store_User.create({
        name: name.trim(),
        email: email.trim(),
        password: password,
        verified: "false",
    })

    const otp = Math.floor(1000 + Math.random() * 10000).toString();

    await Store_otp.create({
        otp: otp,
        user_ID: my_User._id
    })
    // sendemail(otp, email, name);
    handleUserlogin(req, res);
}

async function handleUserlogin(req, res) {

    const { email, password } = req.body;

    const user = await Store_User.findOne({ email: email, password: password });

    if (user) {
        res.cookie("uid", setUser(user._id, user.email, user.verified, "30d"));
        return res.status(200).redirect('/');
    }

    res.render("signup&login", { error: "Email or password is incorrect", login: true });
}

async function handleUserVerify(req, res) {

    const { otp } = req.body;
    const user = getUser(req.cookies.uid);



    const otp_element = await Store_otp.findOne({ user_ID:  new mongoose.Types.ObjectId(user.id), otp: otp });

    if (otp_element) {
        res.cookie("uid", setUser(user.id, user.email, "true", "30d"));
        await Store_User.findOneAndUpdate({ _id:  new mongoose.Types.ObjectId(user.id) }, { verified: "true" });
        await Store_otp.deleteOne({ user_ID:  new mongoose.Types.ObjectId(user.id) })
        return res.status(200).redirect('/');
    }
    res.status(200).render('emailverify.ejs', { error: true, email: user.email });
}

module.exports = { handleUserSignup, handleUserlogin, handleUserVerify };