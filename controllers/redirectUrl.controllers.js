const Store_Url = require('../models/url.models.js');

async function redirectUrl(req, res, next) {

   const url = await Store_Url.findOne({ shortId: req.params.p });

   if (url) {
      res.redirect(url.redirectUrl);
      url.visitHistory.push({ timestamps: Date.now() });
      url.save();
      return;
   }

   next();
}

module.exports = { redirectUrl }