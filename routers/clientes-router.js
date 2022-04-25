var express = require('express');
var router = express.Router();
var clientes = require('../models/clientes');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

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

//Login
router.post('/login', async function(req,res){
    const {correo, contrasena} = req.body;
    const Cliente = await clientes.findOne({correo},{});
    if (!Cliente) return res.status(401).send('Correo incorrecto');
    if (Cliente.contrasena !== contrasena) return res.status(401).send('Contraseña Incorrecta');

    const token = jwt.sign({_id:Cliente._id}, 'clientekey');
    const clienteID = Cliente._id;
    return res.status(200).json({token, clienteID});
});



module.exports = router;