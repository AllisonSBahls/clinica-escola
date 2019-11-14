const express = require("express");
const router = express.Router();
const {admin} = require('../helpers/auth')
const MasterController = require('../controller/MasterController');
const controller = new MasterController();

router.post('/save', admin, async (req, res) =>{
    await controller.registerMaster(req, res)
})

router.get('/', admin, async (req, res) =>{
    await controller.masters(req, res)
});

router.get('/profile/:id', admin, (req, res) =>{
    controller.profileMaster(req, res)
});

router.get('/delete/:id', admin, (req, res) =>{
    controller.deleteMaster(req, res)
});

router.post('/update/:id', admin, async (req, res) =>{
    await controller.updateMaster(req, res)
});


router.get('/register', admin,  (req, res) =>{
    controller.form_admin_master(req, res)
});

router.post('/search', admin, (req, res) =>{
    controller.searchNameMasters(req,res)
})

module.exports = router;