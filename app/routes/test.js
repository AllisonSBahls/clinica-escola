const Master = require('../model/Master');
const express = require("express");
const router = express.Router();
const { Op } = require('sequelize')
const User = require('./User');

router.get('/all',async  (req, res) => {
    await Master.searchMasters().then((masters)=>{
        res.send(masters)
    })
});

router.get('/', (req, res) => {
res.render('index/test')
});


router.post('/master', (req, res) => {
    var campo = '%' + req.body.campo+ '%';
    Master.searchLikeMaster(campo).then((masters)=>{
    }).catch((err)=>{
        res.send(err)
    })
});

module.exports = router;