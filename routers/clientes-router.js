var express = require('express');
var router = express.Router();
var clientes = require('../models/clientes');
var mongoose = require('mongoose');


//obtener la informacion de un cliente
router.get('/:idCliente', function (req, res){
    clientes.find({_id: mongoose.Types.ObjectId(req.params.idCliente)})
    .then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Guardar Cliente
router.post('/', function(req,res){
    let c = new clientes({
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        contrasena: req.body.contrasena
    });
    c.save().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
});



module.exports = router;