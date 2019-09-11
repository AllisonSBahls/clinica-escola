const express = require("express");
const router = express.Router();
const {admin} = require('../helpers/auth')

const PatientController = require('../controller/PatientController');
const controller = new PatientController();

router.post('/save', admin, async (req, res) =>{
    controller.patient_register(req, res)
});

router.get('/', admin, (req, res) =>{
    controller.patients(req, res)
});

router.get('/profile/:id', admin, (req, res) =>{
    controller.profilePatient(req, res)
});

router.get('/delete/:id', admin, (req, res) =>{
    controller.deletePatient(req, res)
});

router.post('/update/:id', admin, (req, res) =>{
    controller.updatePatient(req, res)
});


router.get('/register', admin, (req, res) =>{
    controller.form_admin_patient(req, res)
});

module.exports = router;