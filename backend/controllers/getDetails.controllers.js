const Store_Url = require('../models/url.models.js');
const mongoose = require('mongoose');

module.exports.getDetails = async (req, res) => {
    let shorturl = req.query.url;

    try {
        const url = await Store_Url.findOne({ shortId: shorturl })

        if (url) {
            if (url.owner.equals(new mongoose.Types.ObjectId(req.user.id))) {
                return res.status(200).json({
                    url: url.redirectUrl,
                    lastOpened: url.visitHistory
                });
            } else {
                return res.status(404).json({ error: "Sorry, But This url is not owned by you" });
            }
        }
        res.status(404).json({ error: "Short url not exists." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong, please try again later." });
    }
}

module.exports.getHomePageUrls = async (req, res) => {
    const userId = req.user.id;
    try {
        const urls = await Store_Url.find({ owner: userId }).sort({ createdAt: -1 }).limit(5);
        res.json(urls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong, please try again later." });
    }
}