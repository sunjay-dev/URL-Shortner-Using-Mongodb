const router = require('express').Router();
const { createShortUrl } = require('../controllers/createUrl.controllers.js');
const { userUrls, deleteUrl } = require('../controllers/urls.controllers.js');
const { redirectUrl } = require('../controllers/redirectUrl.controllers.js');
const { getDetails, getHomePageUrls } = require('../controllers/getDetails.controllers.js');
const { restrictToUserLogin } = require('../middlewares/auth.middlewares.js');

router.get('/:p', redirectUrl);

router.get('/', restrictToUserLogin, (req, res) => {
    res.render("home.ejs");
});

router.get('/details', restrictToUserLogin, (req, res) => {
    res.render("details.ejs");
});

router.get('/urls', restrictToUserLogin, (req, res) => {
    res.render("urls.ejs");
});

router.get("/api/get-urls", restrictToUserLogin, getHomePageUrls);
router.get('/api/details', restrictToUserLogin, getDetails);
router.get('/api/userUrls', restrictToUserLogin, userUrls);

router.post('/', restrictToUserLogin, createShortUrl);

router.delete('/:p', restrictToUserLogin, deleteUrl);

module.exports = router;