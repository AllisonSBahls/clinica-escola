const Trainee = require('../model/Trainee');
const User = require('../model/User');
const Secretary = require('../model/Secretary');
const Master = require('../model/Master');
const hash = require('../common/generateHash');
const validate = require('../common/validateFields');

class TraineeController {

    async form_admin_trainee(req, res) {
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        res.render("forms/form_register_trainee", {masterProfile: masterProfile, secretaryrProfile: secretaryrProfile})
    }

    async registerTrainee(req, res) {
        const { email, name, phone, course, period, password } = req.body;

        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);

        var secretPassword = hash.generateHash(password);

        //Verificar Email Existente
        const emailUser = await User.verifyEmail(email)

        const erros = validate.validateFields(emailUser, email, name, password);

        if (erros) {
            res.render('forms/form_register_master', { erros: erros, masterProfile: masterProfile, secretaryrProfile:secretaryrProfile  })
        } else {
            //Registrar informações pessoais do supervisor
            Trainee.insertTrainee(name, email, phone, course, period, secretPassword).then(() => {
                res.redirect('/estagiario');

                req.flash("success_msg", "Estagiario cadastrada com sucesso");
            }).catch(function (erro) {
                req.flash("error_msg", "Ocorreu um erro ao salvar o estagiario");
                res.send("erro" + erro);
        })
    }
}

searchNameTrainee(req, res){
    var campo = '%' + req.body.nameTrainee + '%';
    Trainee.searchTraineeName(campo).then((trainee)=>{
        res.send(trainee)
    }).catch((err) =>{
        res.send(err);
    })
}

    async trainees(req, res) {
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);
        await Trainee.searchAllTraineesUsers().then(function (trainees) {
            res.render("pages/trainee", { trainees: trainees, secretaryrProfile:secretaryrProfile, masterProfile:masterProfile })
        });
    }

    deleteTrainee(req, res) {
         
        Trainee.deleteTrainee(req.params.id).then(() => {
            req.flash("success_msg", "Estagiario deletado com sucesso");
                res.redirect('/estagiario');
            }).catch(function (erro) {
                req.flash("error_msg", "Ocorreu um erro ao deletar o estagiario");
                res.send("erro" + erro);
    })
}
  

    async profileTrainee(req, res) {
        const secretaryrProfile = await Secretary.searchProfileSecretary(req);
        const masterProfile = await Master.searchProfileMaster(req);
        Trainee.searchOneTrainee(req.params.id).then((trainee) => {
            res.render("forms/form_profile_trainee", { trainee: trainee, secretaryrProfile:secretaryrProfile, masterProfile:masterProfile });

        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }


    async updateTrainee(req, res) {
        const { email, name, phone, period, course, idUser } = req.body;
        
        const emailUser = await User.searchEmailUserUpdate(idUser)
        if (emailUser.email == email) {
                    
        Trainee.updateTrainee(name, phone, period, course, req.params.id).then(function () {
            req.flash("success_msg", "Estagiario alterado com sucesso");
            res.redirect('/estagiario');
        }).catch(function (erro) {
            req.flash("error_msg", "Ocorreu um erro ao alterar o estagiario");
            res.send("erro" + erro);
        })

        }else {
            const emailExist = await User.verifyEmail(email);
            if(emailExist.length >  0){
                req.flash('error_msg', 'E-mail já existe');
                res.redirect('/estagiario');
            }else{
                await User.updateEmailUser(idUser, email);
                
                Trainee.updateTrainee(name, phone, period, course, req.params.id).then(function () {
                    req.flash("success_msg", "Estagiario alterado com sucesso");
                    res.redirect('/estagiario');
                }).catch(function (erro) {
                    req.flash("error_msg", "Ocorreu um erro ao alterar o estagiario");
                    res.send("erro" + erro);
                })
            }
        }
    }
    async editProfile(req, res){
        const traineeProfile = await Trainee.searchProfileTraineeUser(req);
        const { email, name, phone, period, course, idUser } = req.body;
        
        const emailUser = await User.searchEmailUserUpdate(idUser)
        if (emailUser.email == email) {
                    
        console.log(period)
        Trainee.updateTrainee(name, phone, period, course, traineeProfile.id).then(function () {
            req.flash("success_msg", "Estagiario alterado com sucesso");
            res.redirect('/user/perfil');
        }).catch(function (erro) {
            req.flash("error_msg", "Ocorreu um erro ao alterar o estagiario");
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
                
                Trainee.updateTrainee(name, phone, period, course, traineeProfile.id).then(function () {
                    req.flash("success_msg", "Perfil alterado com sucesso");
                    res.redirect('/user/perfil');
                }).catch(function (erro) {
                    req.flash("error_msg", "Ocorreu um erro ao alterar Perfil");
                    res.redirect('/user/perfil');
                    console.log(erro)
                })
            }
        }
    }
}


module.exports = TraineeController;