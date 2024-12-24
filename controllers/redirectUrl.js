const Store_Url = require('../models/url');

async function redirectUrl(req, res, next) {

   const url = await Store_Url.findOne({ shortId: req.params.p });

   if (url) {
      url.visitHistory.push({ timestamps: Date.now() });
      url.save();
      return res.redirect(url.redirectUrl);
   }

   next();
}

module.exports = { redirectUrl }