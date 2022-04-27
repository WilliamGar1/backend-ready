var mongoose = require('mongoose');

var esquema = mongoose.Schema({
    dni:String,
    nombre:String,
    celular:String,
    fechaNacimiento: String,
    placa:String,
    correo: String,
    contrasena: String,
    estado: String
});

module.exports = mongoose.model('motoristas', esquema);