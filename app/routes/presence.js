const express = require("express");
const router = express.Router();
const PresenceController = require('../controller/PresenceController');
const controller = new PresenceController();
const {users} = require('../helpers/auth')
const {admin} = require('../helpers/auth')


router.get('/', users,(req, res) =>{
    controller.presences(req,res)
})

router.get('/:id', admin, (req, res) =>{
    controller.findTraineeFrequence(req, res);
})

router.post('/register',users, (req,res) =>{
    controller.fillField(req, res)
})

router.post('/save', users, (req, res) => {
    controller.insertFrequence(req, res)
})
module.exports = router;