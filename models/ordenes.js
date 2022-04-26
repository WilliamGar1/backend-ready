var mongoose = require('mongoose');

var esquema = mongoose.Schema({
	cliente: Object,
	id_motorista: Object,
	empresa: Object,
	productos:Object,
	direccion: Object,
    precio_envio: Number,
    estado: String
});

module.exports = mongoose.model('ordenes', esquema);