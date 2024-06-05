const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const user = require('./routes/userRou');
const bookData = require('./routes/bookRou');

const databaseConnection = require('./database/database');

require('dotenv').config();
const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(session({
    secret: "qwrewadsc2wjdnaskf9ajsn1",
    resave: false,
    saveUninitialized: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/user', user);
app.use('/api/books', bookData);

databaseConnection();

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;