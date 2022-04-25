var express = require('express');
var router = express.Router();
var categorias = require('../models/categorias');
var mongoose = require('mongoose');
var imagen = require('../Middleware/imagenes');

//Obtener Categorias
router.get('/', function (req, res){
    categorias.find({})
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Obtener Empresas
router.get('/empresas', function (req, res){
    categorias.find({},{empresas:true})
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});



//Obtener una categoria
router.get('/:idCategoria', function (req, res){
    categorias.find({_id: mongoose.Types.ObjectId(req.params.idCategoria)},{"empresas":true})
    .then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Obtener los productos de una empresa
router.get('/empresas/:idEmpresa',function (req, res){
    categorias.find(
        {
            "empresas._id" : mongoose.Types.ObjectId(req.params.idEmpresa)
        },
        {"empresas.$":true})
    .then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Obtener detalles de un Producto
router.get('/productos/:idProducto',function (req, res){
    categorias.find(
        {
            "productos._id" : mongoose.Types.ObjectId(req.params.idProducto)

        },{"empresas.productos.$":true})
    .then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Guardar una empresa
router.post('/:idCategoria/empresas', imagen.uploadimagenes.fields([{name:'logoEmpresa', maxCount:1}]), function (req, res){
    categorias.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idCategoria)
        },
        {
            $push:{
                "empresas":{
                    _id:mongoose.Types.ObjectId(),
                    nombre:req.body.nombre,
                    gerente:req.body.gerente,
                    ubicacion:req.body.ubicacion,
                    descripcion: req.body.descripcion,
                    calificacion: req.body.calificacion,
                    logoEmpresa:`${req.files.logoEmpresa[0].filename}`,
                    productos:[]
                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});


//Agregar un Nuevo Producto
router.post('/:idEmpresa/productoNuevo', imagen.uploadimagenes.fields([{name:'imagenProducto', maxCount:1}]), function (req, res){
    categorias.updateOne(
        {
            "empresas._id" : mongoose.Types.ObjectId(req.params.idEmpresa)
        },
        {
            $push:{
                "empresas.$.productos":{
                    _id:mongoose.Types.ObjectId(),
                    nombre:req.body.nombre,
                    precio:req.body.precio,
                    descripcion: req.body.descripcion,
                    imagenProducto:`${req.files.imagenProducto[0].filename}`,
                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});



//Modificar Datos de una empresa
router.put('/empresas/:idEmpresa/modificar', function (req, res){

    let e = {
        nombre:req.body.nombre,
        gerente:req.body.gerente,
        ubicacion:req.body.ubicacion,
        descripcion: req.body.descripcion,
        calificacion: req.body.calificacion
    }
    categorias.updateOne(
        {
            "empresas._id" : mongoose.Types.ObjectId(req.params.idEmpresa)
        },
        {
                $set:{"empresas":e}
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});



module.exports = router;