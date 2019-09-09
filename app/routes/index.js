const express = require("express");
const router = express.Router();
const passport = require("passport");

const IndexController = require('../controller/IndexController');
const controller = new IndexController();


router.get('/', (req, res) => {
    controller.index(req, res)
});

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/paciente',
    failureRedirect: '/',
    failureFlash: true
}
));


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}





module.exports = router;