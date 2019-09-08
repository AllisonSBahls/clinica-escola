const express = require("express");
const router = express.Router();

const PermissaoController = require('../controller/PermissaoController');
const controller = new PermissaoController();

router.post('/save', (req, res) =>{
    controller.permissao_register(req, res)
});

router.get('/', (req, res) =>{
    controller.permissoes(req, res)
});

router.get('/profile/:id', (req, res) =>{
    controller.profilePermissao(req, res)
});

router.get('/delete/:id', (req, res) =>{
    controller.deletePermissao(req, res)
});

router.post('/update/:id', (req, res) =>{
    controller.updatePermissao(req, res)
});


router.get('/register', (req, res) =>{
    controller.form_admin_permissao(req, res)
});
module.exports = router;