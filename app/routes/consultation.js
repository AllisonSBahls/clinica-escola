const express = require("express");
const router = express.Router();
const {admin} = require('../helpers/auth')
const {users} = require('../helpers/auth')

const ConsultController = require('../controller/ConsultationController');
const controller = new ConsultController();

router.post('/save', (req, res) =>{
    controller.consult_save(req, res)
})


module.exports = router;
