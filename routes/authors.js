const express = require('express');
const { builtinModules } = require('module');
const router = express.Router();
const Author = require('../models/author');

//All authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name != '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', { authors: authors, searchOptions: req.query });
    } catch (err) {
        res.redirect('/');
    }
})

//New author route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
})

//Create a new author
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    });

    try {
        const newAuthor = await author.save();
        // res.redirect(`authors/${newAuthor.Id}`)
        res.redirect('authors');
    } catch (err) {
        let locals = { errorMessage: 'Error creating author' };
        res.render('authors/new', {
            author: author,
            locals: locals
        })
    }
})



module.exports = router;