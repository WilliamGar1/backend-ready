var express = require('express');
var router = express.Router();
var motoristas = require('../models/motoristas');
var mongoose = require('mongoose');

router.get('/', (req, res) => {
    motoristas.find({})
    .then(data => {
        res.send(data);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});




module.exports = router;