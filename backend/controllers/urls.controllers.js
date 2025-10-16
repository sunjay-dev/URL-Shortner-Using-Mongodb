const Store_Url = require('../models/url.models.js');

module.exports.userUrls = async (req, res) => {
    const userId = req.user.id; 
    try {
        const urls = await Store_Url.find({ owner: userId }).sort({ createdAt: -1 });
        res.status(200).json(urls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch URLs" });
    }
}

module.exports.deleteUrl = async (req, res) => {
    const { p } = req.params;
    try {
        const deletedUrl = await Store_Url.findOneAndDelete({ owner: req.user.id, shortId: p });

        if (!deletedUrl) {
            return res.status(404).json({ error: "URL not found or unauthorized" });
        }

        res.status(200).json({ message: "URL deleted successfully", deletedUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete URL", error });
    }
}