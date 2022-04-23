var mongoose = require('mongoose');

var esquema = mongoose.Schema({
    nombre:String,
    apellido: String,
    fechaNacimiento: String,
    correo: String,
    contrasena: String
});

module.exports = mongoose.model('administradores', esquema);