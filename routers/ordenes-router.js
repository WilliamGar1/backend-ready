var express = require('express');
var router = express.Router();
var ordenes = require('../models/ordenes');
var mongoose = require('mongoose');


//obtener todas las ordenes pendientes
router.get('/', (req, res) => {
    ordenes.find({
        estado:'pendiente'
    })
    .then(data => {
        res.send(data);
        res.end();
    })
    .catch(e => {
        res.send(e);
        res.end();
    });
});


//actualizar datos de orden tomada
router.put('/:id/taken', (req, res) => {
    ordenes.updateOne({
        _id: mongoose.Types.ObjectId(req.params.id)
    },
    {
        $set: {
            id_motorista: mongoose.Types.ObjectId(req.body._id),
            estado: req.body.estado,
            fecha: req.body.fecha
        }
    })
    .then(() => {
        res.send({update: true, msg:'Se ha tomado la orden'});
        res.end();
    })
    .catch(() => {
        res.send({update: false, msg: 'Error al tomar la orden'});
        res.end();
    });
});

router.put('/:id/update', (req, res) => {
    ordenes.updateOne({
        _id: mongoose.Types.ObjectId(req.params.id)
    },
    {
        $set: {
            estado: req.body.estado,
        }
    })
    .then(() => {
        res.send({update: true, msg:'Se ha actualizado el estado de la orden'});
        res.end();
    })
    .catch(() => {
        res.send({update: false, msg: 'Error al actualizar la orden'});
        res.end();
    });
})

//Nueva Orden
router.post('/nueva', function(req,res){
    let orden = new ordenes({
        cliente:req.body.cliente,
        empresa:req.body.empresa,
        productos:req.body.productos,
        direccion:req.body.direccion,
        precio_envio:25,
        estado:"pendiente"
    });
    orden.save().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
});


//obtener una orden en especifico
router.get('/:id', (req, res) => {
    ordenes.find({
        _id: mongoose.Types.ObjectId(req.params.id)
    })
    .then(data => {
        res.send(data[0]);
        res.end();
    })
    .catch(e => {
        res.send(e);
        res.end();
    });
});


router.get('/:id/driver', (req, res) => {
    ordenes.find({
        id_motorista: mongoose.Types.ObjectId(req.params.id)
    },
    {
        _id: true, empresa: true, fecha: true, estado: true
    })
    .then(data => {
        res.send(data);
        res.end();
    })
    .catch(e => {
        res.send(e);
        res.end();
    });
})

module.exports = router;