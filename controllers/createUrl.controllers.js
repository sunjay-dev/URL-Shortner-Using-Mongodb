const Store_Url = require('../models/url.models.js');
const shortid = require('shortid');
const validator = require('validator');

async function createShortUrl(req, res) {

    let { url, alias } = req.body;
    if (!url) return res.status(404).json({ message: "Please provide a url" });
    url = url.trim();
    if (!validator.isURL(url)) {
        return res.status(400).json({ message: "Invalid URL..." });
    }

    alias = alias ? alias.trim() : null;

    if (alias) {
        let urlExists = await Store_Url.findOne({ shortId: alias });

        if (urlExists) {
            return res.status(400).json({ message: "Alias is already taken" });
        } else {
            let targeturl = /^https?:\/\//i.test(url) ? url : `https://${url}`;

            await Store_Url.create({
                shortId: alias,
                redirectUrl: targeturl,
                visitHistory: [],
                owner: req.user.id,
                name: getDomainWithoutTLD(targeturl)
            });

            return res.status(200).json({ new: alias });
        }
    }

    const rand = shortid.generate().slice(0, 7);

    let urlExists = await Store_Url.findOne({ shortId: rand });
    while (urlExists) {
        rand = shortid.generate().slice(0, 7);
        urlExists = await Store_Url.findOne({ shortId: rand });
    }
    let targeturl = /^https?:\/\//i.test(url) ? url : `https://${url}`;

    await Store_Url.create({
        shortId: rand,
        redirectUrl: targeturl,
        visitHistory: [],
        owner: req.user.id,
        name: getDomainWithoutTLD(targeturl)
    });

    res.status(200).json({ new: rand });
}

function getDomainWithoutTLD(url) {
    const hostname = new URL(url).hostname.replace("www.", "");
    const parts = hostname.split(".");
    return parts.length > 2 ? parts.slice(0, 2).join(".") : parts[0];
}

module.exports = createShortUrl;