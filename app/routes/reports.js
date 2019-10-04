const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const path = require("path");
const fs = require("fs");

const ReportController = require('../controller/ReportsController');
const controller = new ReportController();

router.post('/save', async (req, res) =>{
    controller.report_save(req, res)
});

router.get('/', (req, res) =>{
    controller.reports(req, res)
});

router.get('/report', (req, res) =>{
    controller.report(req, res)
});


module.exports = router;