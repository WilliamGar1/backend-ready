var express = require('express');
var router = express.Router();
var motoristas = require('../models/motoristas');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');


//Obtener todos los motoristas
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


//Login de motoristas
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
    const name = Motorista.nombre;
    const state = Motorista.estado;

    return res.status(200).json({token, _id, acceso: true, name, state});
});


//Obtener un motorista en especifico
router.get('/:id', (req, res) => {
    motoristas.findById(req.params.id)
    .then(data => {
        res.send(data);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
})


module.exports = router;