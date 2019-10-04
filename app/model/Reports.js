const bd = require('./dbConnection');
const Patient = require("./Patient");
const Master = require("./Master");
const Trainee = require("./Trainee");
const Reports = bd.sequelize.define('reports', {
    reports: {
        type: bd.Sequelize.TEXT,
        allowNull: false,
    },
    dateSend: {
        type: bd.Sequelize.DATE,
        allowNull: false,
    }
});

Reports.belongsTo(Trainee, {as : 'reportTrainee', foreingKey: {name: 'fk_report_Trainee'}});
Trainee.hasMany(Reports, {as : 'reportsTrainee', foreingKey: {name: 'fk_reports_Trainee'}});
Reports.belongsTo(Master, {as : 'reportMaster', foreingKey: {name: 'fk_report_Master'}});
Master.hasMany(Reports, {as : 'reportsMaster', foreingKey: {name: 'fk_reports_Master'}});

//Reports.sync({force: true})

module.exports = Reports;