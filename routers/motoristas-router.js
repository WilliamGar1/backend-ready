var express = require('express');
var router = express.Router();
var motoristas = require('../models/motoristas');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

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


router.post('/login', async function(req,res){
    const {correo, pass} = req.body;

    const Motorista = await motoristas.findOne({correo},{});

    if (!Motorista){
        return res.status(401).send('Correo incorrecto');
    }
    if (Motorista.contrasena !== pass){
        return res.status(401).send('Contraseña Incorrecta');
    } 

    const token = jwt.sign({_id: Motorista._id}, 'Motoristakey');

    const _id = Motorista._id;

    return res.status(200).json({token, _id, acceso: true});
});


module.exports = router;