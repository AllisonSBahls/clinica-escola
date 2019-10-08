const express = require("express");
const router = express.Router();
const {admin} = require('../helpers/auth')
const {users} = require('../helpers/auth')

const ConsultController = require('../controller/ConsultationController');
const controller = new ConsultController();

router.post('/save', users, (req, res) =>{
    controller.consult_save(req, res)
})

router.post('/delete', users, (req, res) =>{
    controller.deleteSchedules(req, res)
});

router.post('/cancelamento', users, (req, res) =>{
    controller.cancelamentoSchedule(req, res)
});

module.exports = router;
