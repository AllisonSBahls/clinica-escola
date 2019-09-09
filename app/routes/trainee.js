const express = require("express");
const router = express.Router();

const TraineeController = require('../controller/TraineeController');
const controller = new TraineeController();

router.post('/save', (req, res) =>{
    controller.trainee_register(req, res)
});

router.get('/', (req, res) =>{
    controller.trainees(req, res)
});

router.get('/profile/:id', (req, res) =>{
    controller.profileTrainee(req, res)
});

router.get('/delete/:id', (req, res) =>{
    controller.deleteTrainee(req, res)
});

router.post('/update/:id', (req, res) =>{
    controller.updateTrainee(req, res)
});


router.get('/register', (req, res) =>{
    controller.form_admin_trainee(req, res)
});

module.exports = router;