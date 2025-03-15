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

async function deleteUrl(req, res){
    const { p } = req.params;
    try {

        const deletedUrl = await Store_Url.findOneAndDelete({ owner: req.user.id, shortId: p });

        if (!deletedUrl) {
            return res.status(404).json({ error: "URL not found or unauthorized" });
        }

        return res.status(200).json({ message: "URL deleted successfully", deletedUrl });

    } catch (error) {
        res.status(500).json({ message: "Failed to delete URL", error });
    }
}

module.exports = {userUrls, deleteUrl}; 