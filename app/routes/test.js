const Consultation = require('../model/Consultations');
const express = require("express");
const router = express.Router();
const { Op } = require('sequelize')
const Master = require('../model/Master');

router.get('/',async  (req, res) => {
    res.render('index/test2')
    })


// router.get('/', (req, res) => {
//     Consultation.countSchedule().then((result) => {
//         res.send(result)
//     }).catch((err) => {
//         res.send(err)
//     });
// });


router.post('/master', (req, res) => {
    var campo = '%' + req.body.campo+ '%';
    Master.searchNameMaster(campo).then((masters)=>{
        res.send(masters)
    }).catch((err)=>{
        res.send(err)
    })
});

module.exports = router;