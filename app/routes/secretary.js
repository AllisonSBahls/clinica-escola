const express = require("express");
const router = express.Router();

const SecretaryController = require('../controller/SecretaryController');
const controller = new SecretaryController();

router.post('/save', (req, res) =>{
    controller.secretary_register(req, res)
});

router.get('/', (req, res) =>{
    controller.secretary(req, res)
});

router.get('/profile/:id', (req, res) =>{
    controller.profileSecretary(req, res)
});

router.get('/delete/:id', (req, res) =>{
    controller.deleteSecretary(req, res)
});

router.post('/update/:id', (req, res) =>{
    controller.updateSecretary(req, res)
});


router.get('/register', (req, res) =>{
    controller.form_admin_secretary(req, res)
});

module.exports = router;