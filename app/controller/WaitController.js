
const Wait = require('../model/Wait');
const moment = require('moment');
const Secretary = require('../model/Secretary');
const Patient = require('../model/Patient');
const Master = require('../model/Master');
const Consultation = require('../model/Consultations');

class WaitController {
    async waitSave(req, res) {
        if (req.user.NivelPermissaoId == 1) {

            const {consultationId, patientIdHidden} =  req.body
            const master = await Master.searchProfileMaster(req);
    
            await Consultation.deleteSchedules(consultationId);
        
            Wait.insertWait(patientIdHidden, master.id, null).then(function () {
                req.flash("success_msg", "Paciente colocado na lista de Espera");
                res.redirect('/dashboard');
            }).catch(function (err) {
                res.send(err);
            })

        } else if (req.user.NivelPermissaoId == 2) {
            const secretary = await Secretary.searchProfileSecretary(req);
            Wait.insertWait(patientIdHidden,null, secretary.id).then(function () {
                req.flash("success_msg", "Paciente colocado na lista de Espera");
                res.redirect('/dashboard');
            }).catch(function (err) {
                res.send(err);
            })
        }
    }

    async waitFindAll(req, res) {
        const secretary = await Secretary.searchProfileSecretary(req);
        const master = await Master.searchProfileMaster(req);

        if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
            Wait.findAll({
                include: [{
                    model: Patient, as: 'waitPatient',
                }, {
                    model: Secretary, as: 'waitSecretary',
                }, {
                    model: Master, as: 'waitMaster',
                }],
            }).then((waits) => {
                res.render('pages/waits', { waits: waits, masterProfile: master, secretaryProfile: secretary });
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
        const {patientWaitId} =  req.body
        Wait.searchUpdateWait(patientWaitId).then(()=>{
            req.flash("success_msg", "Paciente retirado na lista de Espera com suceso");
            res.redirect('/waits');
        }).catch(()=>{
            req.flash("error_msg", "Erro ao retirar o paciente da lista de Espera");
            res.redirect('/waits');
        })
    } 
}
module.exports = WaitController;