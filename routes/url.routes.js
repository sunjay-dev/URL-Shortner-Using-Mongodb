const express = require('express');
const router = express.Router();
const createShortUrl = require('../controllers/createUrl.controllers.js');
const {userUrls, deleteUrl} = require('../controllers/urls.controllers.js');
const {redirectUrl} = require('../controllers/redirectUrl.controllers.js');
const {getDetails, getHomePageUrls} = require('../controllers/getDetails.controllers.js');
const {restrictToUserlogin} = require('../middlewares/auth.middlewares.js');

router.get('/:p', redirectUrl);

router.get('/',restrictToUserlogin, (req,res)=>{
    res.render("home.ejs")
})

router.get('/details', restrictToUserlogin,(req,res)=>{
    res.render("details.ejs")
})

router.get('/urls', restrictToUserlogin, (req,res)=>{
    res.render("urls.ejs")
})

router.get("/api/get-urls", restrictToUserlogin ,getHomePageUrls);
router.post('/', restrictToUserlogin, createShortUrl);
router.get('/api/details/',restrictToUserlogin, getDetails)

router.get('/api/userUrls/',restrictToUserlogin, userUrls)

router.delete('/:p', restrictToUserlogin,deleteUrl)

module.exports = router;