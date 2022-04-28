var express = require('express');
var router = express.Router();
var administrador = require('../models/administradores');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');


//Login
router.post('/login', async function(req,res){
    const {correo, contrasena} = req.body;
    const Admin = await administrador.findOne({correo},{});
    if (!Admin) return res.status(401).send('Correo incorrecto');
    if (Admin.contrasena !== contrasena) return res.status(401).send('Contraseña Incorrecta');

    const token = jwt.sign({_id:Admin._id}, 'adminkey');
    const adminID = Admin._id;
    return res.status(200).json({token, adminID});
});

module.exports = router;