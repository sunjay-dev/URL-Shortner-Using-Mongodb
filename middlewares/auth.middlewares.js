const {getUser} = require('../services/auth.services.js');

async function restrictToUserlogin(req,res,next) {
    const uid = req.cookies?.uid;

    if(!uid) return res.redirect('/user/login');

    const user = getUser(uid);
    if(!user) return res.redirect('/user/login');

    req.user=user;
    next();
}

async function restrictToLoginedUser(req, res, next) {
    const token = req.cookies?.uid;
    if (!token) next();
    const user = getUser(token);
    if (user)
    return res.redirect('/');
}

module.exports = {restrictToUserlogin, restrictToLoginedUser};