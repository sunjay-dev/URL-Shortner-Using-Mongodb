const validator = require('validator');
const Store_Url = require('../models/url.models.js');

async function CreateCustomUrl(req,res){

    if(!req.body.url) return res.status(400).json({error: "url not sent with request."})
    if(!req.body.custom) return res.status(400).json({error: "Alias not sent with request."})

    if (!validator.isURL(req.body.url)) {
        return res.status(400).json({ error: "Invalid URL" });
      }
    let rand = req.body.custom;
    
    let urlExists = await Store_Url.findOne({ shortId: rand });

    if(urlExists){
      return res.status(409).send("url already exists");
    }

    let targeturl = /^https?:\/\//i.test(req.body.url) ? req.body.url : `https://${req.body.url}`;

    await Store_Url.create({
      shortId: rand,
      redirectUrl: targeturl,
      visitHistory:[],
      owner: req.user.id
  });

  res.status(200).json({new : rand});
}

module.exports = {CreateCustomUrl}