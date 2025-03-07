const Store_Url = require('../models/url.models.js');
const shortid = require('shortid');
const validator = require('validator');

async function createShortUrl(req, res) {
    
    const {url} = req.body;
    if(!url) return res.status(404).json({ error: "Please provide a url"});

    if (!validator.isURL(url)) {
        return res.status(400).json({ error: "Invalid URL" });
    }

    const rand = shortid.generate();

    let urlExists = await Store_Url.findOne({ shortId: rand });
    while (urlExists) {
        rand = shortid.generate();
        urlExists = await Store_Url.findOne({ shortId: rand });
    }
    let targeturl = /^https?:\/\//i.test(req.body.url) ? req.body.url : `https://${req.body.url}`;

    await Store_Url.create({
        shortId:rand,
        redirectUrl: targeturl,
        visitHistory:[],
        owner: req.user.id
    });

    res.status(200).json({new : rand});
}

module.exports = createShortUrl;