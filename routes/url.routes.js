const express = require('express');
const router = express.Router();
const createShortUrl = require('../controllers/createUrl.controllers.js');
const {CreateCustomUrl} = require('../controllers/createCustomUrl.controllers.js');
const {redirectUrl} = require('../controllers/redirectUrl.controllers.js');
const {getDetails} = require('../controllers/getDetails.controllers.js');
const {restrictToUserlogin} = require('../middlewares/auth.middlewares.js');

router.get('/', (req,res)=>{
    res.render("home.ejs", {title:"home"})
})

router.get('/custom', restrictToUserlogin,(req,res)=>{
    res.render("custom.ejs", {title:"custom"})
})

router.get('/details', restrictToUserlogin,(req,res)=>{
    res.render("details.ejs", {title:"details"})
})

router.get('/about', (req,res)=>{
    res.render("about.ejs", {title:"about"})
})

router.post('/', restrictToUserlogin, createShortUrl);
router.post('/custom',restrictToUserlogin, CreateCustomUrl);
router.get('/api/details/',restrictToUserlogin, getDetails)

router.get('/:p', redirectUrl);

module.exports = router;