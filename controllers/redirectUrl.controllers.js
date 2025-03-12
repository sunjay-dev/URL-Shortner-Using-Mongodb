const Store_Url = require('../models/url.models.js');
const useragent = require('useragent');
async function redirectUrl(req, res, next) {
   
   try {
      const url = await Store_Url.findOne({ shortId: req.params.p });

      if (!url) return next();

      res.redirect(url.redirectUrl);

      let ip = req.headers['x-forwarded-for'] || req.ip;
      let agent = useragent.parse(req.headers['user-agent']);

      let country = "Unknown", city = "Unknown", region = "Unknown";
      try {
         const response = await fetch(`https://ipapi.co/${ip}/json/`);
         if (response.ok) {
            const data = await response.json();
            country = data.country || "Unknown";
            city = data.city || "Unknown";
            region = data.region || "Unknown";
         }
      } catch (err) {
         console.log('Error fetching geolocation:', err.message);
      }

      url.visitHistory.push({
         timestamps: Date.now(),
         ipaddress: ip,
         browser: agent.toAgent(),
         os: agent.os.toString(),
         device: agent.device.toString(),
         country: country,
         city: city,
         region: region
      });

      await url.save();

   } catch (error) {
      console.error('Error in redirectUrl:', error);
      next();
   }
}

module.exports = { redirectUrl }