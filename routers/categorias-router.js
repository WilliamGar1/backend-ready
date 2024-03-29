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

//Obtener Categorias con algunos datos
router.get('/some', (req, res) => {
    categorias.find(
        {},
        {
            empresas: false
        }
    )
    .then(result => {
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Guardar una categoria
router.post('/nueva', imagen.uploadimagenes.fields([{name:'imagenCategoria', maxCount:1}]), (req, res) => {

    let c = new categorias({
        nombreCategoria: req.body.nombreCategoria,
        imagenCategoria: `${req.files.imagenCategoria[0].filename}`,
        empresas: []
    })

    c.save()
    .then(() => {
        result = { msg: 'Categoria insertada', save: true };
        res.send(result);
        res.end();
    })
    .catch(error => {
        res.send({error, save: false});
        res.end();
    });
});

//Obtener Empresas
router.get('/empresas', function (req, res){
    categorias.find({},{empresas:true,nombreCategoria:true})
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});



//Obtener las empresas de una categoria
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

//Obtener los productos de una empresa
router.get('/empresas/:empresa/productos' , (req, res) => {
    categorias.find(
        {
            "empresas.nombre": req.params.empresa
        },
        {_id: false, "empresas.productos._id": true, "empresas.productos.imagenProducto.$": true})
    .then(result=>{
        res.send(result[0].empresas[0].productos);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//Obtener detalles de un Producto
router.get('/productos/:id', (req, res) => {
    console.log('entro');
    categorias.find(
        {
            "empresas.productos._id" : mongoose.Types.ObjectId(req.params.id)

        },{_id: false, "empresas.productos._id": true, "empresas.productos.imagenProducto.$": true})
    .then(result => {
        res.send(result[0].empresas[0].productos);
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
        _id: mongoose.Types.ObjectId(req.params.idEmpresa),
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
                $set:{"empresas.$":e}
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});


//Eliminar una Empresa
router.delete('/:idEmpresa/eliminar', function (req, res){
    categorias.updateOne(
        {
            "empresas._id" : mongoose.Types.ObjectId(req.params.idEmpresa)
        },
        {
                $pull:{
                    empresas:{
                                _id:mongoose.Types.ObjectId(req.params.idEmpresa)
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


module.exports = router;