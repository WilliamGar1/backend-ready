var express = require('express');
var router = express.Router();
var ordenes = require('../models/ordenes');
var mongoose = require('mongoose');

router.get('/', (req, res) => {
    ordenes.find({})
    .then(data => {
        res.send(data);
        res.end();
    })
    .catch(e => {
        res.send(e);
        res.end();
    })
});

module.exports = router;