const express = require("express");
const router = express.Router();
const {admin} = require('../helpers/auth')
const {users} = require('../helpers/auth')

const UserController =require('../controller/UserController')
const controller = new UserController();

router.get('/profile/:id', admin, async (req, res) =>{
    controller.profileUser(req, res)
});

router.post('/update/:id', admin, async (req, res) =>{
    controller.updateUser(req, res)
});

router.get('/perfil', users, async (req, res) => {
    controller.myProfile(req, res);
});

module.exports = router;