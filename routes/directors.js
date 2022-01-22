const express = require('express');
const { builtinModules } = require('module');
const router = express.Router();
const Director = require('../models/director');

//All directors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name != '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const directors = await Director.find(searchOptions);
        res.render('directors/index', { directors: directors, searchOptions: req.query });
    } catch (err) {
        res.redirect('/');
    }
})

//New directors route
router.get('/new', (req, res) => {
    res.render('directors/new', { director: new Director() });
})

//Create a new director
router.post('/', async (req, res) => {
    const director = new Director({
        name: req.body.name
    });

    try {
        const newDirector = await director.save();
        // res.redirect(`authors/${newAuthor.Id}`)
        res.redirect('directors');
    } catch (err) {
        let locals = { errorMessage: 'Error creating director' };
        res.render('directors/new', {
            director: director,
            locals: locals
        })
    }
})



module.exports = router;