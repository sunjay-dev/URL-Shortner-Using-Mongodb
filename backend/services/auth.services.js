const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports.setUser = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
}

module.exports.getUser = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}