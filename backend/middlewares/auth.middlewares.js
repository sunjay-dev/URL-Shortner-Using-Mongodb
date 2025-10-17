const { getUser } = require('../services/auth.services.js');

module.exports.restrictToUserLogin = async (req, res, next) => {
    const uid = req.cookies?.uid;
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    try {
        if (uid) {
            const user = getUser(uid);
            if (!user) return res.redirect('/user/login');
            req.user = user;
            return next();
        }

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                const user = getUser(token);
                if (!user) return res.status(401).json({ message: 'Invalid token' });
                req.user = user;
                return next();
            } catch (err) {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }
        }

        if (req.headers.accept?.includes('text/html')) {
            res.redirect('/user/login');
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
}

module.exports.restrictToLoginedUser = (req, res, next) => {
    const token = req.cookies?.uid;
    if (!token)
        return next();
    const user = getUser(token);
    if (!user)
        return next();

    res.redirect('/');
}