const Permissao = require('../model/Permissoes');

class PermissaoController{
  
    form_admin_permissao(req, res){
        return res.render("forms/form_admin_permissoes");
    }

    permissao_register(req, res){
        Permissao.create({
            permissao: req.body.permissao
        }).then(function(){
            res.redirect('/permissao');
        }).catch(function(erro){
            res.send("erro" + erro);
        })
    }

    permissoes(req, res) {
        Permissao.findAll()
        .then(function(permissoes){ // a variavel dentro de permissoes recebera todas as informações d epermissao
            res.render("pages/permissoes", {permissoes: permissoes})
        });   
    }

    deletePermissao(req, res){
        Permissao.destroy({
            where: {'id': req.params.id}
        }).then(function(){
            res.redirect('/permissao');
        }).catch(function(erro){
            res.send("erro" + erro);
        })
    }

    profilePermissao(req, res){
        Permissao.findAll({
            where: {'id': req.params.id}
        }).then((permissao)=>{
            res.render("forms/form_profile_permissoes", {permissao: permissao});
        }).catch((erro)=>{
            res.send("erro" + erro);
        })
        
    }

    updatePermissao(req, res){
        Permissao.update(
            {permissao: req.body.permissao},
            {where: {'id': req.params.id}}
        ).then(()=>{
            res.redirect("/permissao");
        }).catch((erro)=>{
            res.send("erro" + erro);
        })
    }
    
}

module.exports =  PermissaoController;