const Permission = require('../model/Permissoes');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

class UserController {

    profileUser(req, res) {
        User.findAll({
            where: { 'id': req.params.id },
        }).then((users) => {
            res.render("forms/form_profile_user", { users: users });

        }).catch((erro) => {
            res.send("erro" + erro);
        })
    }


    async updateUser(req, res) {
        const { email, password } = req.body;
        //Verificar Email Existente
        const emailUser = await User.findAll({
            where: { email: email }
        })

        var generateHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        };
        var masterPassword = generateHash(password);

        if (emailUser == email && emailUser.length > 0) {
            req.flash('error_msg', 'Email já existe');
            res.redirect('/supervisor')
        } else {
            User.update({
                email,
                password: masterPassword
            }, {
                where: { id: req.params.id }
            }).then(() => {
                res.redirect('/');
                req.flash("success_msg", "Informações de Usuário alteradas com sucesso");
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao salvar o supervisor');
                res.redirect('/')
            });
        }
    }
}

module.exports = UserController;