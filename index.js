var express = require('express');
var cors = require('cors'); 
var bodyParser = require('body-parser');
var database = require('./modules/database');
var administradorRouter =require('./routers/administrador-router');
var motoristasRouter = require('./routers/motoristas-router');
var clientesRouter = require('./routers/clientes-router');
var ordenesRouter = require('./routers/ordenes-router');
var categoriasRouter = require('./routers/categorias-router');



var app = express();
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Rutas
app.use('/clientes', clientesRouter);
app.use('/categorias',categoriasRouter);
app.use('/orders',ordenesRouter);
app.use('/motoristas',motoristasRouter);
app.use('/administrador',administradorRouter);



app.listen(3300, ()=>{
    console.log('Servidor del backend levantado en 3300');
});