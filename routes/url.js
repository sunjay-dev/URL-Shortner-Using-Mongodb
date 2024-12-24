const express = require('express');
const router = express.Router();
const createShortUrl = require('../controllers/createUrl');
const {CreateCustomUrl} = require('../controllers/createCustomUrl');
const {redirectUrl} = require('../controllers/redirectUrl');
const {getDetails} = require('../controllers/getDetails');
const {restrictToUserlogin, restrictToUserVerification} = require('../middlewares/auth');

router.get('/',restrictToUserlogin, restrictToUserVerification, (req,res)=>{
    res.render("home.ejs", {title:"home"})
})

router.get('/custom', restrictToUserlogin, restrictToUserVerification,(req,res)=>{
    res.render("custom.ejs", {title:"custom"})
})

router.get('/details', restrictToUserlogin,restrictToUserVerification,(req,res)=>{
    res.render("details.ejs", {title:"details"})
})

router.get('/about', (req,res)=>{
    res.render("about.ejs", {title:"about"})
})

router.post('/', restrictToUserlogin, restrictToUserVerification, createShortUrl);
router.post('/custom',restrictToUserlogin, restrictToUserVerification, CreateCustomUrl);
router.get('/api/details/',restrictToUserlogin, restrictToUserVerification, getDetails)

router.get('/:p', redirectUrl);

module.exports = router;