const Presence = require('../model/Presence');
const Consultation = require('../model/Consultations');
const Secretary = require('../model/Secretary');
const Trainee = require('../model/Trainee');
const Master = require('../model/Master');
const Patient = require('../model/Patient');
const Wait = require('../model/Wait');
const dateFormat = require('../common/dateFormat')
const moment = require('moment');

class PresenceController {

    async presences(req, res) {
        const secretaryProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);
        res.render('pages/presence', {secretaryProfile:secretaryProfile, masterProfile:masterProfile})
    }

    async registerPresence(req, res){
        const secretaryProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);
        res.render('forms/register/form_controller_presence', {secretaryProfile:secretaryProfile, masterProfile:masterProfile})
    }

}

module.exports =  PresenceController;