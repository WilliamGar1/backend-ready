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

router.put('/:id/taken', (req, res) => {
    ordenes.updateOne({
        _id: mongoose.Types.ObjectId(req.params.id)
    },
    {
        $set: {
            id_motorista: mongoose.Types.ObjectId(req.body._id),
            estado: req.body.estado,
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
})

module.exports = router;