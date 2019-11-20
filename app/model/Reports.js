const bd = require('./dbConnection');
const Patient = require("./Patient");
const Consultation = require("./Consultations");
const Master = require("./Master");
const Trainee = require("./Trainee");
const moment = require('moment');

const Reports = bd.sequelize.define('reports', {
    reports: {
        type: bd.Sequelize.TEXT,
        allowNull: false,
    },
    dateSend: {
        type: bd.Sequelize.DATE,
        allowNull: false,
    },
    namePatient: {
        type: bd.Sequelize.STRING,
    },
    IdConsult: {
        type: bd.Sequelize.STRING,
    },
    dateConsult: {
        type: bd.Sequelize.DATE,
    },
});

Reports.belongsTo(Trainee, { as: 'reportTrainee', foreingKey: { name: 'fk_report_Trainee' } });
Trainee.hasMany(Reports, { as: 'reportsTrainee', foreingKey: { name: 'fk_reports_Trainee' } });
Reports.belongsTo(Master, { as: 'reportMaster', foreingKey: { name: 'fk_report_Master' } });
Master.hasMany(Reports, { as: 'reportsMaster', foreingKey: { name: 'fk_reports_Master' } });

//Reports.sync({force: true})

Reports.sendReports = function (reports, namePatient, IdConsult, dateConsult, idTrainee, idMaster) {
    return Reports.create({
        reports: reports,
        namePatient: namePatient,
        IdConsult: IdConsult,
        dateConsult: dateConsult,
        reportTraineeId: idTrainee,
        reportMasterId: idMaster,
        dateSend: moment(),

    })
}
Reports.searchOneReport = (id) => {
    return Reports.findOne({
        where: { 'id': id },
        include: [{
            model: Master, as: 'reportMaster',
        }, {
            model: Trainee, as: 'reportTrainee',

        }]
    })
}

Reports.searchAllReportTrainee = (id) => {
    return Reports.findAll({
        where: { 'reportTraineeId': id },
        include: [{
            model: Master, as: 'reportMaster',
        }, {
            model: Trainee, as: 'reportTrainee',

        }]
    })
}
Reports.searchReportsDate = function (startDay, endDay, id) {
    return Reports.findAll({
        limit: 6,
        where: {
            reportTraineeId: id,
            dateSend: {
                [Op.between]: [startDay, endDay]
            },
        }, include: [{
            model: Master, as: 'reportMaster',
        }, {
            model: Trainee, as: 'reportTrainee',

        }]
    })
}

module.exports = Reports;