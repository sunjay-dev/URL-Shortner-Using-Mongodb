const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const path = require('path');
const connectToMongoDB = require('./connection.js');
const passport = require('passport');

connectToMongoDB(process.env.mongoUri).then(() => {
    console.log('Mongoose connected!')
})
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

const urlRoutes = require('./routes/url.js');
const userRoutes = require('./routes/user.js');

app.use(urlRoutes);
app.use('/user', userRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => { console.log(`App running on :${PORT}`); })