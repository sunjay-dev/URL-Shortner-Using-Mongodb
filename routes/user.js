const express = require('express');
const {handleUserSignup, handleUserlogin, handleUserVerify} = require('../controllers/user');
const router = express.Router();
const {restrictToGuests} = require('../middlewares/auth.js');

router.get('/signup', restrictToGuests, (req, res) => {
    res.render('signup&login', { login });
})
router.get('/login', restrictToGuests, (req, res) => {
    const login = true;
    res.render('signup&login', { login });
})
router.get('/logout', (req, res) => {
    res.clearCookie('uid');
    res.redirect('/user/login')
})

router.post('/',restrictToGuests,handleUserSignup)
router.post('/login', restrictToGuests,handleUserlogin)
router.post('/verify', handleUserVerify)
module.exports = router;