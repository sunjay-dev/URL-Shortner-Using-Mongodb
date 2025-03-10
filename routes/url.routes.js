const express = require('express');
const router = express.Router();
const createShortUrl = require('../controllers/createUrl.controllers.js');
const {redirectUrl} = require('../controllers/redirectUrl.controllers.js');
const {getDetails, getHomePageUrls} = require('../controllers/getDetails.controllers.js');
const {restrictToUserlogin} = require('../middlewares/auth.middlewares.js');

router.get('/',restrictToUserlogin, (req,res)=>{
    res.render("home.ejs")
})

router.get('/details', restrictToUserlogin,(req,res)=>{
    res.render("details.ejs")
})

router.get('/about', (req,res)=>{
    res.render("about.ejs")
})

router.get("/api/get-urls", restrictToUserlogin ,getHomePageUrls);
router.post('/', restrictToUserlogin, createShortUrl);
router.get('/api/details/',restrictToUserlogin, getDetails)

router.get('/:p', redirectUrl);

module.exports = router;