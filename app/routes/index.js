const express = require("express");
const router = express.Router();
const passport = require("passport");
const {users} = require('../helpers/auth')

const IndexController = require('../controller/IndexController');
const controller = new IndexController();
const ConsultController = require('../controller/ConsultationController');
const consult = new ConsultController();


router.get('/', (req, res) => {
    controller.index(req, res)
});

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
}
));

router.get('/pagenotfound', (req, res) => {
    controller.notfound(req, res);
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}

router.get('/consult/days',  users,(req, res) =>{
    controller.findConsultDay(req, res);
})
router.get('/consult/next', users, (req, res) =>{
    controller.findConsultNext(req, res);
})


router.get('/logout', (req, res) => {
    req.logout();
    req.flash('sucess_msg', 'Deslogado com sucesso')
    res.redirect('/')
});

router.get('/dashboard', users, (req, res) => {
    controller.dashboard(req, res)
});


router.get('/signup',(req, res)=>{
    controller.signup(req, res);
})

router.post('/save', async (req, res)=>{
    controller.signup_save(req, res);
});

router.get('/calendar', users, (req, res)=>{    
   consult.consultations(req, res)
})

router.get('/schedules', users, (req, res)=>{    
    controller.onlySchedules(req, res)
 })

 router.get('/auth/google',  passport.authenticate('google',{
     scope:['email', 'profile']
 }))

 router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('../../dashboard');
 })
module.exports = router;