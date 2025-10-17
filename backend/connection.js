const mongoose = require('mongoose');

module.exports.connectToMongoDB = (url) => {
    return mongoose.connect(url);
}