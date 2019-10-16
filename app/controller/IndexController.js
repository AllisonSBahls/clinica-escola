const Patient = require('../model/Patient');
const User = require('../model/User');
const hash = require('../common/generateHash');
const Secretary = require('../model/Secretary');
const Master = require('../model/Master');
const Trainee = require('../model/Trainee');
const Consultation = require('../model/Consultations');
const Wait = require('../model/Wait');
const validate = require('../common/validateFields');


class IndexController {

    index(req, res) {
        res.render("index/login")
    }

    async dashboard(req, res) {
        const patients = await Patient.searchAllPatients();
        const waitPatients = await Wait.searchWaitPatients();
        const trainees = await Trainee.searchAllTrainees();
        const consult = await Consultation.searchConsultsWeek();

    if (req.user.NivelPermissaoId == 1) {
        const masterProfile = await Master.searchProfileMaster(req);
            
        Consultation.searchAllConsults().then((consultation) => {
            res.render('index/dashboard', {waitPatients: waitPatients, masterProfile: masterProfile,  consult: consult, consultation: consultation, patients: patients, trainees: trainees });
        }).catch((err) => {
            res.send('erro' + err)
        })

     } else if (req.user.NivelPermissaoId == 2) {
            const secretaryProfile = await Secretary.searchProfileSecretary(req);
            
            Consultation.searchAllConsults().then((consultation) => {
                res.render('index/dashboard', {waitPatients: waitPatients, secretaryProfile: secretaryProfile, consult: consult, consultation: consultation, patients: patients, trainees: trainees });

            }).catch((err) => {
                res.send('erro' + err)
            })

    } else if(req.user.NivelPermissaoId == 4){
        const patientProfile = await Patient.searchProfilePatient(req);
        const consult = await Consultation.searchConsultWeekPatient(patientProfile.id);

        Consultation.searchConsultsPatients( patientProfile.id, ).then((consultation) => {
            res.render('index/dashboard', {patientProfile: patientProfile, consult: consult, consultation: consultation, patients: patients, trainees: trainees });
        }).catch((err) => {
            res.send('erro' + err)
        })

    }else if(req.user.NivelPermissaoId == 3){
        const traineeProfile = await Trainee.searchProfileTrainee(req);
        const consult = await Consultation.searchConsultWeekTrainee(traineeProfile.id);
        
        await Consultation.searchConsultsTrainees(traineeProfile.id).then((consultation) => {
            res.render('index/dashboard', {traineeProfile:traineeProfile, consult: consult, consultation: consultation, patients: patients, trainees: trainees });
        }).catch((err) => {
            res.send('erro' + err)
        })
    }    
} 

    signup(req, res) {
        res.render('index/register', {erros: {}})
    }

    notfound(req, res) {
        res.render('partials/404')
    }

    async signup_save(req, res) {
        const { email, name, phone, password} = req.body;
        //Criptografa a Senha
        var secretPassword = hash.generateHash(password);
        //Verificar Email Existente
        const emailUser = await User.verifyEmail(email)
        //Validar os campos
        const erros = validate.validateFields(emailUser, email, name, password);
        if (erros){
            res.render('index/register', { erros: erros })
        } else {
            //Paciente se cadastrando pelo site
            Patient.insertPatientRegister(email, secretPassword, name, phone).then(() => {
                res.redirect('/')
            }).catch((err) => {
                res.send(err);
            });
        }
    }
}


module.exports = IndexController;