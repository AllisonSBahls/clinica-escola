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

        res.render("forms/form_register_patient",  {masterProfile:masterProfile, secretaryrProfile:secretaryrProfile})
    }

    async registerPatient(req, res) {
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        const { email, name, phone, dateBirth, gender, password, district, number, address, spouse, maritalstatus, schooling, country, uf, cepCidade} = req.body;
        //Verificar Email Existente
        var secretPassword = hash.generateHash(password);
        //Verificar Email Existente
        const emailUser = await User.verifyEmail(email)
        //Validar os campos
        const erros = validate.validateFields(emailUser, email, name, password);
        if (erros) {
            req.flash('error_msg', 'E-mail já existe');
            res.render('forms/form_register_patient', { erros: erros, masterProfile:masterProfile, secretaryrProfile:secretaryrProfile })
        } else {
            Patient.insertPatient(email, secretPassword, name, phone, dateBirth, gender, address, district, number, schooling, spouse, maritalstatus, country, uf, cepCidade).then((result) => {
                res.redirect('/paciente');
                req.flash("success_msg", "Paciente cadastrado com sucesso");
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
            console.log(err)
            res.redirect('partials/404');
        })
    }

    searchNamePatient(req, res){
        var campo = '%' + req.body.namePatient + '%';
        Patient.searchPatientName(campo).then((paciente)=>{
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

    async alterarPaciente(id){
      
    }

    async updatePatient(req, res) {
        const { email, name, phone, dateBirth, gender, idUser, district, number, address, spouse, maritalstatus, schooling, country, uf, cepCidade } = req.body;
        const emailUser = await User.searchEmailUserUpdate(idUser)
        if (emailUser.email == email) {
            Patient.updateProfilePatient(name, phone, dateBirth, gender, req.params.id, address, district, number, schooling, spouse, maritalstatus, country, uf, cepCidade).then(function () {
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
                Patient.updateProfilePatient(name, phone, dateBirth, gender,  req.params.id, address, district, number, schooling, spouse, maritalstatus, country, uf, cepCidade).then(function () {
                    req.flash("success_msg", "Paciente alterado com sucesso");
                    res.redirect('/paciente');
                }).catch(function (erro) {
                    req.flash("error_msg", "Ocorreu um erro ao alterar o paciente");
                    res.redirect('/paciente');

                })
            }
        }
    }

    async editProfile(req, res){
        const patientProfile = await Patient.searchProfilePatient(req);

        const { email, name, phone, dateBirth, gender, idUser, district, number, address, spouse, maritalstatus, schooling, country, uf, cepCidade } = req.body;
        const emailUser = await User.searchEmailUserUpdate(idUser)
        if (emailUser.email == email) {
            Patient.updateProfilePatient(name, phone, dateBirth, gender, patientProfile.id, address, district, number, schooling, spouse, maritalstatus, country, uf, cepCidade).then(function () {
                req.flash("success_msg", "Paciente alterado com sucesso");
                res.redirect('/user/perfil');
            }).catch(function (erro) {
                req.flash("error_msg", "Ocorreu um erro ao alterar o seu perfil");
                res.redirect('/user/perfil');
                console.log(erro)

            })
        }else {
            const emailExist = await User.verifyEmail(email);
            if(emailExist.length >  0){
                req.flash('error_msg', 'E-mail já existe');
                res.redirect('/user/perfil');
            }else{
                await User.updateEmailUser(idUser, email);
                Patient.updateProfilePatient(name, phone, dateBirth, gender, patientProfile.id, address, district, number, schooling, spouse, maritalstatus, country, uf, cepCidade).then(function () {
                    req.flash("success_msg", "Paciente alterado com sucesso");
                    res.redirect('/user/perfil');
                }).catch(function (erro) {
                    req.flash("error_msg", "Ocorreu um erro ao alterar o seu perfil");
                    res.redirect('/user/perfil');
                    console.log(erro)


                })
            }
        }
    }
}

module.exports = SecretaryController;