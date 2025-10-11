const express = require('express');
const router = express.Router();
const githubPassport  = require("../services/github.auth.services.js");
const googlePassport = require("../services/google.auth.services.js");
const { restrictToLoginedUser } = require('../middlewares/auth.middlewares.js');


router.get('/login', restrictToLoginedUser, (req, res) => {
    res.render('login');
})

router.get('/auth/github', restrictToLoginedUser, githubPassport.authenticate('github', { prompt: "select_account"}));

router.get(
    "/auth/github/callback", restrictToLoginedUser,
    githubPassport.authenticate("github", { session: false }),
    (req, res) => {
        if (!req.user) {
            return res.status(401).json({ error: "Authentication failed" });
        }
       
     res.cookie("uid", req.user.token, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
     });
    return res.redirect('/');
    }
);

router.get("/auth/google", restrictToLoginedUser, googlePassport.authenticate("google", { prompt: "select_account"}));

router.get("/auth/google/callback", restrictToLoginedUser, 
  googlePassport.authenticate("google", { session: false }),
  (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Authentication failed" });
    }
    res.cookie("uid", req.user.token, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
     });

    return res.redirect('/');
  }
);

router.post('/login', )

router.get('/logout', (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.clearCookie('uid');
    res.status(200).redirect('/user/login');
})

module.exports = router;