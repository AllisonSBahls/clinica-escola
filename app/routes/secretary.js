const express = require("express");
const router = express.Router();
const {admin} = require('../helpers/auth')

const SecretaryController = require('../controller/SecretaryController');
const controller = new SecretaryController();

router.post('/save', admin, async (req, res) =>{
    controller.registerSecretary(req, res)
});

router.get('/', admin, (req, res) =>{
    controller.secretaries(req, res)
});

router.get('/profile/:id', admin, (req, res) =>{
    controller.profileSecretary(req, res)
});

router.get('/delete/:id', admin, (req, res) =>{
    controller.deleteSecretary(req, res)
});

router.post('/update/:id', admin, (req, res) =>{
    controller.updateSecretary(req, res)
});

router.post('/edit', admin, (req, res) =>{
    controller.editSecretary(req, res)
});


router.get('/register', admin, (req, res) =>{
    controller.form_admin_secretary(req, res)
});

router.post('/search', admin, (req, res) =>{
    controller.searchNameSecretary(req, res)
})

module.exports = router;