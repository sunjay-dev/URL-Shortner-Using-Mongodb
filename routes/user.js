const express = require('express');
const router = express.Router();
const passport = require("../services/github.auth.services.js");
const { restrictToGuests } = require('../middlewares/auth.middlewares.js');


router.get('/auth/github', passport.authenticate('github', { prompt: "select_account"}));

router.get(
    "/auth/github/callback",
    passport.authenticate("github", { session: false }),
    (req, res) => {
        if (!req.user) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        res.cookie("uid", req.user.token);
        res.redirect('/');
    }
);


router.get('/login', restrictToGuests, (req, res) => {
    res.render('login');
})

router.get('/logout', (req, res) => {
    res.clearCookie('uid');
    res.redirect('/user/login');
})

module.exports = router;