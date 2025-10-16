require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectToMongoDB = require('./connection.js');
const passport = require('passport');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', true);

connectToMongoDB(process.env.MONGODB_URI).then(() => {
    console.log('Mongoose connected!')
})
app.use(passport.initialize());

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

const urlRoutes = require('./routes/url.routes.js');
const userRoutes = require('./routes/user.routes.js');

app.use('/', urlRoutes);
app.use('/user', userRoutes);

app.use(express.static(path.join(__dirname, "public"), { 
    setHeaders: (res, path) => {
        res.status(200);
        res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
}));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => { console.log(`App running on PORT: ${PORT}`); })