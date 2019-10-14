
const Wait = require('../model/Wait');
const moment = require('moment');
const Secretary = require('../model/Secretary');
const Patient = require('../model/Patient');
const Master = require('../model/Master');
const Consultation = require('../model/Consultations');

class WaitController {
    async waitSave(req, res) {
        if (req.user.NivelPermissaoId == 1) {
            const master = await Master.findOne({
                where: { userMasterId: req.user.id }
            });

            await Consultation.destroy({
                where: { id: req.body.consultationId }
            });

            Wait.create({
                dateEntry: moment(),
                waitPatientId: parseInt(req.body.patientIdHidden),
                waitMasterId: master.id,
            }).then(function () {
                req.flash("success_msg", "Paciente colocado na lista de Espera");
                res.redirect('/dashboard');
            }).catch(function (err) {
                res.send(err);
            })

        } else if (req.user.NivelPermissaoId == 2) {
            const secretary = await Secretary.findOne({
                where: { userSecretaryId: req.user.id }
            });

            Wait.create({
                dateEntry: moment(),
                waitPatientId: parseInt(req.body.patientIdHidden),
                waitSecretaryId: secretary.id,
            }).then(function () {
                Consultation.destroy({
                    where: { id: req.body.consultationId }
                });
                req.flash("success_msg", "Paciente colocado na lista de Espera");
                res.redirect('/dashboard');
            }).catch(function (err) {
                res.send(err);
            })
        }
    }

    async waitFindAll(req, res) {

        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            const masterProfile = await Master.findOne({
                where: { userMasterId: req.user.id }
            });
            Wait.findAll({
                include: [{
                    model: Patient, as: 'waitPatient',
                }, {
                    model: Secretary, as: 'waitSecretary',
                }, {
                    model: Master, as: 'waitMaster',
                }],
            }).then((waits) => {
                res.render('pages/waits', { waits: waits, masterProfile: masterProfile });
            })
        } else if (req.user.NivelPermissaoId == 2) {
            const secretaryProfile = await Secretary.findOne({
                where: { userSecretaryId: req.user.id }
            });
            Wait.findAll({
                include: [{
                    model: Patient, as: 'waitPatient',
                }, {
                    model: Secretary, as: 'waitSecretary',
                }, {
                    model: Master, as: 'waitMaster',
                }],
            }).then((waits) => {
                res.render('pages/waits', { waits: waits, secretaryProfile: secretaryProfile });
            })
        }
    }

    async waitDelete(req, res){
        Wait.destroy({
            where: {'id': req.params.id}
        }).then(()=>{
            req.flash("success_msg", "Paciente retirado na lista de Espera com suceso");
            res.redirect('/waits');
        }).catch(()=>{
            req.flash("error_msg", "Erro ao retirar o paciente da lista de Espera");
            res.redirect('/waits');
        })
    }

    waitUpdate(req, res){
        Wait.update({
            dateExit: moment(),
        },{
            where: {id : req.body.id}
        }).then(()=>{
            req.flash("success_msg", "Paciente retirado na lista de Espera com suceso");
            res.redirect('/waits');
        }).catch(()=>{
            req.flash("error_msg", "Erro ao retirar o paciente da lista de Espera");
            res.redirect('/waits');
        })
    } 
}
module.exports = WaitController;