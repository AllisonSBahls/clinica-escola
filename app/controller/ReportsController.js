const Report = require('../model/Reports');
const Trainee = require('../model/Trainee');
const Master = require('../model/Master');
const Consultation = require('../model/Consultations');

const moment = require('moment');
const crypto = require('crypto');
const alg = 'aes-256-ctr';
const pwd = '$2fdp$vfs.)vk4DS$2fdp$vfs.)vk4DS'

// var RSA = require('hybrid-crypto-js').RSA;
// var Crypt = require('hybrid-crypto-js').Crypt;

// var crypt = new Crypt();
// var rsa = new RSA();


// rsa.generateKeyPair(function (keyPair) {
//         publicKey = keyPair.publicKey;
//         privateKey = keyPair.privateKey;
// })


class ReportController {
   
    async report_register(req, res) { 
        const masters = await Master.findAll();

        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2){
            const masterProfile = await Master.searchProfileMaster(req);
            const consult = await Consultation.searchAllConsults();
            res.render("forms/form_report", {consult:consult,  masterProfile: masterProfile, traineeProfile: {}, masters: masters });
      
        }
            else if (req.user.NivelPermissaoId == 3){
                const traineeProfile = await Trainee.searchProfileTrainee(req);
                const consult = await Consultation.searchConsultsTraineesDate(traineeProfile.id)
                res.render("forms/form_report", {consult:consult,  masterProfile: {}, traineeProfile: traineeProfile, masters: masters });
    }
}

    async report_save(req, res) {
        let reportCrypt = req.body.report;
        let traineeProfile = await Trainee.findOne({
            where: { userTraineeId: req.user.id }
        });
       
    //        var privateKey = keyPair.privateKey;

            // var encrypted = crypt.encrypt(publicKey, reportCrypt);
  //          var decrypted = crypt.decrypt(privateKey, encrypted);
//           console.log(decrypted)
            const iv = crypto.randomBytes(16)
            const cipher = crypto.createCipheriv(alg, pwd, iv)
            const cryptedReport = cipher.update(reportCrypt, 'utf8', 'hex') + cipher.final('hex');
            const crypted = iv.toString('hex') +':'+cryptedReport;
            Report.create({
                reports: crypted,
                dateSend: moment(),
                namePatient: req.body.namePatient,
                infoPatient: req.body.infoPatient,
                reportTraineeId: traineeProfile.id,
                reportMasterId: req.body.masterId,
            }).then(function () {
                res.redirect('/relatorios');
            }).catch(function (erro) {
                res.send("erro" + erro);
            })
        //  });
    }

    async report_find(req, res) {
 
        let traineeProfile = await Trainee.findOne({
            where: { userTraineeId: req.user.id }
        });
        let masterProfile = await Master.findOne({
            where: { userMasterId: req.user.id }
        });


        Report.findOne({
            where: { 'id': req.params.id },
            include: [{
                model: Master, as: 'reportMaster',
            }, {
                model: Trainee, as: 'reportTrainee',

            }]
        }).then((report) => {     
            const parts = report.reports.split(':')
            const decipher = crypto.createDecipheriv(alg, pwd, new Buffer.from(parts[0], 'hex')); 
            const reportDecrypt =  decipher.update(parts[1], 'hex', 'utf8') + decipher.final('utf8')
            res.render('forms/form_report_view', { reportDecrypt:reportDecrypt, report: report, traineeProfile: traineeProfile, masterProfile: masterProfile })
        }).catch((err) => {
            res.send('erros' + err);
        })

    }

    async reports(req, res) {
        if (req.user.NivelPermissaoId == 3) {
            let traineeProfile = await Trainee.findOne({
                where: { userTraineeId: req.user.id }
            });
            Report.findAll({
                where: { reportTraineeid: traineeProfile.id },
                include: [{
                    model: Master, as: 'reportMaster'
                }]
            }).then((reports) => {
                res.render('pages/reports', { reports: reports, traineeProfile: traineeProfile })
            }).catch((err) => {
                res.send('erros' + err);
            })

        } else if (req.user.NivelPermissaoId == 1) {
            let masterProfile = await Master.findOne({
                where: { userMasterId: req.user.id }
            });
            Report.findAll({
                where: { reportMasterid: masterProfile.id },
                include: [{
                    model: Trainee, as: 'reportTrainee'
                }]
            }).then((reports) => {
                res.render('pages/reports', { reports: reports, masterProfile: masterProfile })
            }).catch((err) => {
                res.send('erros' + err);
            })
        } else {
            res.render('partials/404');
        }
    }

}

module.exports = ReportController;