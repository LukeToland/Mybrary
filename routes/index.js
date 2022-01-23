const express = require('express');
const { builtinModules } = require('module');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', async (req, res) => {
    let movies = [];
    try {
        movies = await Movie.find().sort({ createdAtDate: 'desc' }).limit(10).exec();
        res.render('index', { movies: movies });
    } catch (err) {
        console.log(err);
    }

})

module.exports = router;