const express = require("express");
const router = express.Router();
const {users} = require('../helpers/auth')

const WaitController = require('../controller/WaitController');
const controller = new WaitController();


router.post('/save', (req, res) =>{
    controller.waitSave(req, res)
});

router.get('/', (req, res) =>{
    controller.waitFindAll(req, res)
});

router.get('/delete/:id', (req, res) =>{
    controller.waitDelete(req, res)
});

router.post('/update', (req, res) =>{
    controller.waitUpdate(req, res)

});

module.exports = router;
