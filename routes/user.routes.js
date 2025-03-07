const express = require('express');
const router = express.Router();
const githubPassport  = require("../services/github.auth.services.js");
const googlePassport = require("../services/google.auth.services.js");
const { restrictToGuests } = require('../middlewares/auth.middlewares.js');


router.get('/auth/github', githubPassport.authenticate('github', { prompt: "select_account"}));

router.get(
    "/auth/github/callback",
    githubPassport.authenticate("github", { session: false }),
    (req, res) => {
        if (!req.user) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        res.cookie("uid", req.user.token);
        res.redirect('/');
    }
);

router.get("/auth/google", googlePassport.authenticate("google", { prompt: "select_account"}));

router.get("/auth/google/callback",
  googlePassport.authenticate("google", { session: false }),
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