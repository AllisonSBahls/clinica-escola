const express = require("express");
const router = express.Router();
const Consultation = require('../model/Consultations');

const Patient = require('../model/Patient');

router.get('/', async (req, res) => {
    Patient.searchProfilePatient(req, res).then((cons2) => {
        console.log(cons2)
    }).catch((err) => {
        res.send(err)
    });
});
router.get('/c', async (req, res) => {
    await Consultation.searchAllConsults().then((cons2) => {
        console.log(cons2)
    }).catch((err) => {
        res.send(err)
    });
});

module.exports = router;