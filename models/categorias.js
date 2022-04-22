var mongoose = require('mongoose');

var esquema = mongoose.Schema({
    nombreCategoria:String,
    empresas:Array
});

module.exports = mongoose.model('categorias', esquema);