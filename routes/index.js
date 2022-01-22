const express = require('express');
const { builtinModules } = require('module');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;