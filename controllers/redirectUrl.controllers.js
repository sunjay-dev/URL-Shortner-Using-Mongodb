const Store_Url = require('../models/url.models.js');

async function redirectUrl(req, res, next) {

   const url = await Store_Url.findOne({ shortId: req.params.p });

   if (url) {
      res.redirect(url.redirectUrl);
      let ip = req.headers['x-forwarded-for'] || req.ip;
      url.visitHistory.push({ timestamps: Date.now(), ipaddress: ip });
      url.save();
      return;
   }

   next();
}

module.exports = { redirectUrl }