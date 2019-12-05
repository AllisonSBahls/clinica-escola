const Patient = require('../model/Patient');
const User = require('../model/User');
const Master = require('../model/Master');
const Secretary = require('../model/Secretary');
const hash = require('../common/generateHash');
const validate = require('../common/validateFields');
const crypt = require('../common/encrypt');

class SecretaryController {

    async form_admin_patient(req, res) {
        const secretaryProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        res.render("forms/form_register_patient",  {masterProfile:masterProfile, secretaryProfile:secretaryProfile})
    }

    async registerPatient(req, res) {
        const secretaryProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        const { email, name, phone, dateBirth, gender, password, district, number, address, spouse, maritalstatus, schooling, country, uf, cepCidade} = req.body;
        //Verificar Email Existente
        var secretPassword = hash.generateHash(password);
        //Verificar Email Existente
        const emailUser = await User.verifyEmail(email)
        const addressCrypt = crypt.encryptReport(address);
        const ufCrypt = crypt.encryptReport(uf);
        const districtCrypt = crypt.encryptReport(district);
        const countryCrypt = crypt.encryptReport(country);
        const spouseCrypt = crypt.encryptReport(spouse);

        //Validar os campos
        const erros = validate.validateFields(emailUser, email, name, password);
        if (erros) {
            req.flash('error_msg', 'E-mail já existe');
            res.render('forms/form_register_patient', { erros: erros, masterProfile:masterProfile, secretaryProfile:secretaryProfile })
        } else {
            Patient.insertPatient(email, secretPassword, name, phone, dateBirth, gender, addressCrypt, districtCrypt, number, schooling, spouseCrypt, maritalstatus, countryCrypt, ufCrypt, cepCidade).then((result) => {
                 req.flash("success_msg", "Paciente cadastrado com sucesso");
                res.redirect('/paciente');
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao salvar o Paciente');
                res.redirect('/paciente');
            });;
        }
    }

    async patients(req, res) {
        const secretaryProfile  = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        Patient.searchAllPatientsUsers().then(function (patients) {
            res.render("pages/patient", { patients: patients, masterProfile:masterProfile, secretaryProfile :secretaryProfile })
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
        const secretaryProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        Patient.searchOnePatient(req.params.id).then((patient) => {
            let addressDecrypt = crypt.decryptReport(patient.address);
            let districtDecrypt = crypt.decryptReport(patient.district);
            let spouseDecrypt = crypt.decryptReport(patient.spouse);
            let countryDecrypt = crypt.decryptReport(patient.country);
            let UFDecrypt = crypt.decryptReport(patient.UF);
            res.render("forms/form_profile_patient", {countryDecrypt:countryDecrypt, UFDecrypt:UFDecrypt, addressDecrypt:addressDecrypt, districtDecrypt:districtDecrypt, spouseDecrypt:spouseDecrypt,   patient: patient, masterProfile:masterProfile, secretaryProfile:secretaryProfile });
        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }


    async updatePatient(req, res) {
        const { email, name, phone, dateBirth, gender, idUser, district, number, address, spouse, maritalstatus, schooling, country, uf, cepCidade } = req.body;
        const emailUser = await User.searchEmailUserUpdate(idUser)

        const addressCrypt = 'crypt.encryptReport(address)';
        const ufCrypt = 'crypt.encryptReport(uf)';
        const districtCrypt = 'crypt.encryptReport(district)';
        const countryCrypt = 'crypt.encryptReport(country)';
        const spouseCrypt = 'crypt.encryptReport(spouse)';

        if (emailUser.email == email) {
            Patient.updateProfilePatient(name, phone, dateBirth, gender, req.params.id, addressCrypt, districtCrypt, number, schooling, spouseCrypt, maritalstatus, countryCrypt, ufCrypt, cepCidade).then(function () {
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
                Patient.updateProfilePatient(name, phone, dateBirth, gender,  req.params.id, addressCrypt, districtCrypt, number, schooling, spouseCrypt, maritalstatus, countryCrypt, ufCrypt, cepCidade).then(function () {
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
        
        const addressCrypt = crypt.encryptReport(address);
        const ufCrypt = crypt.encryptReport(uf);
        const districtCrypt = crypt.encryptReport(district);
        const countryCrypt = crypt.encryptReport(country);
        const spouseCrypt = crypt.encryptReport(spouse);

        if (emailUser.email == email) {
            Patient.updateProfilePatient(name, phone, dateBirth, gender, patientProfile.id, addressCrypt, districtCrypt, number, schooling, spouseCrypt, maritalstatus, countryCrypt, ufCrypt, cepCidade).then(function () {
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
                Patient.updateProfilePatient(name, phone, dateBirth, gender, patientProfile.id, addressCrypt, districtCrypt, number, schooling, spouseCrypt, maritalstatus, countryCrypt, ufCrypt, cepCidade).then(function () {
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