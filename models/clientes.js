var mongoose = require('mongoose');

var esquema = mongoose.Schema({
    nombre:String,
    correo:String,
    contrasena:String,
    telefono:String,
});

module.exports = mongoose.model('clientes', esquema);