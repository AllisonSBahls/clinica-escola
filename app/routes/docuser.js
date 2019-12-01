const express = require("express");
const router = express.Router();

const {users} = require('../helpers/auth')
const {admin} = require('../helpers/auth')


router.get('/', (req, res) =>{
    res.render('partials/help/index')
})

module.exports = router;