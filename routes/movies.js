const { builtinModules } = require('module');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const Director = require('../models/director');
const Movie = require('../models/movie');

//File upload setup
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
const uploadPath = path.join('public', Movie.posterImageBasePath);
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
});

//All movies route
router.get('/', async (req, res) => {
    let query = Movie.find();

    if (!!req.query.title) {
        query = query.regex('title', new RegExp(req.query.title, 'i'));
    }
    if (!!req.query.releasedBefore) {
        query = query.lte('releaseDate', req.query.releasedBefore);
    }
    if (!!req.query.releasedAfter) {
        query = query.gte('releaseDate', req.query.releasedAfter);
    }

    try {
        const movies = await query.exec();
        res.render('movies/index', {
            movies: movies,
            searchOptions: req.query
        });

    } catch (err) {

    }
})

//New movie route
router.get('/new', async (req, res) => {
    renderNewPage(res, new Movie());
})

//Create a new movie
router.post('/', upload.single('poster'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null;
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        releaseDate: new Date(req.body.releaseDate),
        runTime: req.body.runTime,
        description: req.body.description,
        posterImageName: fileName
    });

    try {
        const newMovie = await movie.save();
        res.redirect(`movies`);
    } catch (err) {
        if (movie.posterImageName) removeMoviePoster(movie.posterImageName);
        renderNewPage(res, movie, true);
        //console.log(err);
    }
})

function removeMoviePoster(posterImageName) {
    fs.unlink(path.join(uploadPath, posterImageName), err => {
        if (err) console.error(err);
    });
}

async function renderNewPage(res, movie, hasError = false) {
    try {
        const directors = await Director.find({});
        // const movie = new Movie();
        const params = {
            directors: directors,
            movie: movie
        };
        if (hasError) params.errorMessage = 'Error creating movie';
        res.render('movies/new', params);
    } catch (err) {
        res.redirect('/movies');
    }
}


module.exports = router;