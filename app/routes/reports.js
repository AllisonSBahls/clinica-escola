const express = require("express");
const router = express.Router();
const {users} = require('../helpers/auth')

const ReportController = require('../controller/ReportsController');
const controller = new ReportController();

router.post('/save',users, async (req, res) =>{
    controller.report_save(req, res)
});

router.get('/',users, (req, res) =>{
    controller.reports(req, res)
});

router.get('/report', users, (req, res) =>{
    controller.report_register(req, res)
});

router.get('/report/:id', (req, res) => {
    controller.report_find(req, res);
})

router.get('/reports/:id', (req, res) => {
    controller.reportFindAllTraineeMaster(req, res);
})

router.post('/date', (req, res)  => {
    controller.reportFindDate(req, res);
})

router.post('/register', users, (req, res)=>{
    controller.fillFieldReports(req, res);
})





module.exports = router;