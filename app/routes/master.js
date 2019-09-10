const express = require("express");
const router = express.Router();
const {master} = require('../helpers/auth')
const MasterController = require('../controller/MasterController');
const controller = new MasterController();

router.post('/save', async (req, res) =>{
    controller.master_register(req, res)
});

router.get('/', (req, res) =>{
    controller.masters(req, res)
});

router.get('/profile/:id', (req, res) =>{
    controller.profileMaster(req, res)
});

router.get('/delete/:id', (req, res) =>{
    controller.deleteMaster(req, res)
});

router.post('/update/:id', async (req, res) =>{
    await controller.updateMaster(req, res)
});


router.get('/register', master, (req, res) =>{
    controller.form_admin_master(req, res)
});

module.exports = router;