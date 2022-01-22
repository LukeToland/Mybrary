const express = require('express');
const { builtinModules } = require('module');
const router = express.Router();
const Movie = require('../models/movie');

//All movies route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name != '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const movies = await Movie.find(searchOptions);
        res.render('movies/index', { movies: movies, searchOptions: req.query });
    } catch (err) {
        res.redirect('/');
    }
})

//New author route
router.get('/new', (req, res) => {
    res.render('movies/new', { movie: new Movie() });
})

//Create a new author
router.post('/', async (req, res) => {
    const movie = new Movie({
        name: req.body.name
    });

    try {
        const newMovie = await movie.save();
        // res.redirect(`authors/${newAuthor.Id}`)
        res.redirect('movies');
    } catch (err) {
        let locals = { errorMessage: 'Error creating movie' };
        res.render('movies/new', {
            movie: movie,
            locals: locals
        })
    }
})



module.exports = router;