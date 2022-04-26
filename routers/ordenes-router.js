var express = require('express');
var router = express.Router();
var ordenes = require('../models/ordenes');
var mongoose = require('mongoose');


//obtener todas las ordenes pendientes
router.get('/', (req, res) => {
    ordenes.find({
        estado:'pendiente'
    })
    .then(data => {
        res.send(data);
        res.end();
    })
    .catch(e => {
        res.send(e);
        res.end();
    })
});
//Nueva Orden
router.post('/nueva', function(req,res){
    let orden = new ordenes({
        cliente:req.body.cliente,
        empresa:req.body.empresa,
        productos:req.body.productos,
        direccion:req.body.direccion,
        precio_envio:25,
        estado:"pendiente"
    });
    orden.save().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
});



module.exports = router;