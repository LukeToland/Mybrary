const { builtinModules } = require('module');
const express = require('express');
const Movie = require('../models/movie');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const Director = require('../models/director');

//File upload setup
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif'];
const uploadPath = path.join('public', Movie.posterImageBasePath);
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
});

//All movies route
router.get('/', async (req, res) => {
    try {


    } catch (err) {

    }
})

//New movie route
router.get('/new', async (req, res) => {
    try {
        const directors = await Director.find({});
        const movie = new Movie();
        res.render('movies/new', { directors: directors, movie: movie });
    } catch (err) {
        res.redirect('/movies');
    }
})

//Create a new movie
router.post('/', upload.single('poster'), async (req, res) => {
    try {
        const fileName = req.file != null ? req.fileName : null;
        const movie = new Movie({
            title: req.body.title,
            director: req.body.director,
            releaseDate: new Date(req.body.releaseDate),
            runTime: req.body.runTime,
            description: req.body.description,
            posterImageName: fileName
        });

        const newMovie = await movie.save();
        res.redirect(`movies`);
    } catch (err) {

    }
})



module.exports = router;