const Patient = require('../model/Patient');
const User = require('../model/User');
const Master = require('../model/Master');
const Secretary = require('../model/Secretary');
const hash = require('../common/generateHash');
const validate = require('../common/validateFields');

class SecretaryController {

    async form_admin_patient(req, res) {
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        console.log(masterProfile);
        res.render("forms/form_register_patient",  {masterProfile:masterProfile, secretaryrProfile:secretaryrProfile})
    }

    async registerPatient(req, res) {
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        const { email, name, phone, dateBirth, gender, password } = req.body;
        //Verificar Email Existente
        var secretPassword = hash.generateHash(password);
        //Verificar Email Existente
        const emailUser = await User.verifyEmail(email)
        //Validar os campos
        const erros = validate.validateFields(emailUser, email, name, password);
        if (erros) {
            res.render('forms/form_register_patient', { erros: erros, masterProfile:masterProfile, secretaryrProfile:secretaryrProfile })
        } else {
            Patient.insertPatient(email, secretPassword, name, phone, dateBirth, gender).then((result) => {
                req.flash("success_msg", "Paciente cadastrado com sucesso");
                res.redirect('/paciente');
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao salvar o Paciente');
                res.redirect('/paciente');

            });;
        }
    }

    async patients(req, res) {
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        Patient.searchAllPatientsUsers().then(function (patients) {
            res.render("pages/patient", { patients: patients, masterProfile:masterProfile, secretaryrProfile:secretaryrProfile})
        }).catch(function (err){
            console.log('erro')
            res.redirect('partials/404');
        })
    }

    searchNamePatient(req, res){
        var campo = '%' + req.body.namePatient + '%';
        Patient.searchTraineeName(campo).then((paciente)=>{
           res.send(paciente)
        }).catch((err) =>{
            res.send(err);
        })
    }

    deletePatient(req, res) {
        Patient.deletePatient(req.params.id).then(function () {
            req.flash("success_msg", "Paciente deletado com sucesso");
            res.redirect('/paciente');
        }).catch(function (erro) {
            req.flash('error_msg', 'O paciente está vinculado a uma consulta/agendamento');
            res.redirect('/paciente');
        })
    }

    async profilePatient(req, res) {
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        Patient.searchOnePatient(req.params.id).then((patient) => {
            res.render("forms/form_profile_patient", { patient: patient, masterProfile:masterProfile, secretaryrProfile:secretaryrProfile });
        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }


    async updatePatient(req, res) {
        const { email, name, phone, dateBirth, gender, idUser } = req.body;
        const emailUser = await User.searchEmailUser(idUser)

        if (emailUser.email == email) {
            Patient.updateProfilePatient(name, phone, dateBirth, gender, req.params.id).then(function () {
                req.flash("success_msg", "Paciente alterado com sucesso");
                res.redirect('/paciente');
            }).catch(function (erro) {
                req.flash("error_msg", "Ocorreu um erro ao alterar o paciente");
                res.send("erro" + erro);
            })
        }else {
            const emailExist = await User.verifyEmail(email);
            if(emailExist.length >  0){
                req.flash('error_msg', 'E-mail já existe');
                res.redirect('/paciente');
            }else{
                await User.updateEmailUser(idUser, email);
                Patient.updateProfilePatient(name, phone, dateBirth, gender, req.params.id).then(function () {
                    req.flash("success_msg", "Paciente alterado com sucesso");
                    res.redirect('/paciente');
                }).catch(function (erro) {
                    req.flash("error_msg", "Ocorreu um erro ao alterar o paciente");
                    res.redirect('/paciente');

                })
            }
        }
    }
}

module.exports = SecretaryController;