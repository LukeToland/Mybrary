if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to mongoose'));

const indexRoute = require('./routes/index');
const directorRoute = require('./routes/directors');
const movieRoute = require('./routes/movies');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/', indexRoute);
app.use('/directors', directorRoute);
app.use('/movies', movieRoute);
app.listen(process.env.PORT || 3000);

