const express = require("express");
const router = express.Router();

const PatientController = require('../controller/PatientController');
const controller = new PatientController();

router.post('/save', async (req, res) =>{
    controller.patient_register(req, res)
});

router.get('/', (req, res) =>{
    controller.patients(req, res)
});

router.get('/profile/:id', (req, res) =>{
    controller.profilePatient(req, res)
});

router.get('/delete/:id', (req, res) =>{
    controller.deletePatient(req, res)
});

router.post('/update/:id', (req, res) =>{
    controller.updatePatient(req, res)
});


router.get('/register', (req, res) =>{
    controller.form_admin_patient(req, res)
});

module.exports = router;