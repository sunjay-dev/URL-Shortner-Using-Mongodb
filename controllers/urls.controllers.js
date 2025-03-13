const Store_Url = require('../models/url.models.js');

async function userUrls(req, res) {

    try {
        const userId = req.user.id; 
        const urls = await Store_Url.find({ owner: userId }).sort({ createdAt: -1 });
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch URLs" });
    }
}


module.exports = userUrls; 