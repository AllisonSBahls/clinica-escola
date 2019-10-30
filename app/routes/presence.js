const express = require("express");
const router = express.Router();
const PresenceController = require('../controller/PresenceController');
const controller = new PresenceController();


router.get('/controle', (req, res) =>{
    controller.presences(req,res)
})

router.get('/registrar', (req,res) =>{
    controller.registerPresence(req, res)
})

module.exports = router;