const Master = require('../model/Master');
const bcrypt = require('bcryptjs');
const User = require('../model/User')
const Secretary = require('../model/Secretary');

class MasterController {


    async form_admin_master(req, res) {
        const masterProfile = await Master.findOne({
            where: {userMasterId: req.user.id} });
        const secretaryrProfile = await Secretary.findOne({
            where: {userSecretaryId: req.user.id} });
        
        res.render("forms/form_register_master", { erros: {}, masterProfile: masterProfile, secretaryrProfile:secretaryrProfile })
    }
    async master_register(req, res) {

        const { email, name, phone } = req.body;
        //Verificar Email Existente
        const emailUser = await User.findAll({
            where: { email: email }
        })

        var generateHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        };
        var masterPassword = generateHash(req.body.password);

        //Validar formulario
        var erros = [];
        if (emailUser.length > 0) {
            erros.push({ texto: 'E-mail já esta sendo utilizado' })
        }
        if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
            erros.push({ texto: 'Nome invalido' })
        }
        if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
            erros.push({ texto: 'E-mail invalido' })
        }
        if (!req.body.password || typeof req.body.password == undefined || req.body.password == null) {
            erros.push({ texto: 'Senha invalida' })
        }
        if (erros.length > 0) {
            res.render('forms/form_register_master', { erros: erros })
        }

        else {
            const user = await User.create({
                email,
                password: masterPassword,
                NivelPermissaoId: 1
            });
            //Registrar informações pessoais do supervisor
            Master.create({
                name,
                phone,
                userMasterId: user.id
            }).then(() => {
                req.flash("success_msg", "Supervisor cadastrado com sucesso");
                res.redirect('/supervisor', {masterProfile: masterProfile});

            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao salvar o supervisor');
                res.redirect('/supervisor')
            })
        }
    }
    async masters(req, res) {
        const masterProfile = await Master.findOne({
            where: {userMasterId: req.user.id} });
        const secretaryrProfile = await Secretary.findOne({
            where: {userSecretaryId: req.user.id} });
        Master.findAll({
            include: [{
                model: User, as: 'userMaster'
            }]
        })
            .then(function (masters) {
                res.render("pages/master", { masters: masters, masterProfile: masterProfile, secretaryrProfile:secretaryrProfile })
            });
    }

    deleteMaster(req, res) {
        Master.destroy({
            where: { 'id': req.params.id }
        }).then(function () {
            req.flash("success_msg", "Supervisor deletado com sucesso");
            res.redirect('/supervisor');;
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    }

    profileMaster(req, res) {
        const masterProfile = Master.findOne({
            where: {userMasterId: req.user.id} });

        Master.findAll({
            where: { 'id': req.params.id },
            include: [{
                model: User, as: 'userMaster',
            },]
        }).then((master) => {
            res.render("forms/form_profile_master", { master: master, masterProfile: masterProfile });

        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }

    async updateMaster(req, res) {
            const newEmail = await User.findAll({
                where: { email: req.body.email }
            })
            if (newEmail || newEmail > 0) {
               console.log('email já existe')
                res.render('/supervisor')
            } else {
                const user = User.update({
                    email: req.body.email
                }, {
                    where: { id: parseInt(req.body.idUser) }
                });

                Master.update({
                    name: req.body.name,
                    phone: req.body.phone,
                },
                    { where: { 'id': req.params.id } }
                ).then(function () {
                    req.flash('success_msg', 'Supervisor alterado com sucesso');
                    res.redirect('/supervisor');
                }).catch((err)=>{
                    req.flash('error_msg', 'Erro ao cadastrar o supervisor ' + err);
                })
        }

    }
}

module.exports = MasterController;