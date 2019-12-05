const express = require("express");
const router = express.Router();
const {admin} = require('../helpers/auth')
const {users} = require('../helpers/auth')

const UserController =require('../controller/UserController')
const controller = new UserController();

router.get('/profile/:id', admin, async (req, res) =>{
    controller.profileUser(req, res)
});

router.get('/perfil', users, async (req, res) => {
    controller.myProfile(req, res);
});


router.get('/password', users, async (req, res) => {
    controller.passwordUser(req, res);
})
router.post('/passup/', users, async (req, res) =>{
    controller.passwordUpdate(req, res)
});


module.exports = router;