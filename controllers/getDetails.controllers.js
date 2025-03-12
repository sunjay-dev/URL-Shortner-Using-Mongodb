const Store_Url = require('../models/url.models.js');
const mongoose = require('mongoose');

async function getDetails(req, res) {

    let shorturl = req.query.url;

    const url = await Store_Url.findOne({ shortId: shorturl })

    if (url) {
        if (url.owner.equals(new mongoose.Types.ObjectId(req.user.id))) {
            return res.status(200).json({
                url: url.redirectUrl,
                lastOpened: url.visitHistory
            })
        } else {
            return res.status(404).json({ error: "Sorry, But This url is not owned by you" });
        }
    }

    res.status(404).json({ error: "Short url not exists." });
}

async function getHomePageUrls(req, res) {
    try {
        const userId = req.user.id; 
        const urls = await Store_Url.find({ owner: userId }).sort({ createdAt: -1 }).limit(5);
        res.json(urls);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch URLs" });
    }
};

module.exports = { getDetails, getHomePageUrls }