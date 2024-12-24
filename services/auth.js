const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.jwtSecret;

function setUser(id, email, verified, time){
    return jwt.sign({
    id,email,verified
    }, secret, {
       expiresIn: time // Expires in 1 hour
    })
}

function getUser(token){
  try {
    return jwt.verify(token,secret)
  } catch (error) {
    return null;
  }   
}

module.exports={setUser, getUser}