const Patient = require('../model/Patient');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

class IndexController {

    index(req, res) {
         res.render("index/login")
    }

    dashboard(req, res){
        res.render('index/dashboard')
    }

    signup(req,res){
        res.render('index/register')
    }

    notfound(req, res){
        res.render('partials/404')
    }

    async signup_save(req, res) {
        //Criptografa a Senha
        var generateHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        };
        var secretaryPassword = generateHash(req.body.password);

        const { email, name, phone } = req.body;
        //Verificar Email Existente
        const emailUser = await User.findAll({
            where: { email: email }
        })

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
            res.render('index/register', { erros: erros })
        } else {
            //Registrar o usuario do supervisor
            const user = await User.create({
                email: email,
                password: secretaryPassword,
                NivelPermissaoId: 4
            });

            //Registrar informações pessoais do supervisor
            Patient.create({
                name,
                phone,
                userPatientId: user.id
            }).then(function (){
                res.redirect('/');
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}


module.exports = IndexController;