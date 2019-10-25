const express = require("express");
const router = express.Router();
const {admin} = require('../helpers/auth')
const {users} = require('../helpers/auth')

const ConsultController = require('../controller/ConsultationController');
const controller = new ConsultController();

router.post('/save', users, (req, res) =>{
    controller.saveConsult(req, res)
})

router.post('/delete', admin, (req, res) =>{
    controller.deleteSchedules(req, res)
});

router.post('/cancelamento', admin, (req, res) =>{
    controller.cancelamentoSchedule(req, res)
});

router.post('/confirmar', admin, (req, res) =>{
    controller.confirmSchedules(req, res);
})

module.exports = router;
