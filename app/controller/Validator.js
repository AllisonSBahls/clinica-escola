module.exports = {
    validatorForms: function(req, res){
        var erros = [];
        if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
            erros.push({text: 'Nome invalido'})
        }
        if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
            erros.push({text: 'E-mail invalido'})
        }
        if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
            erros.push({text: 'Senha invalida'})
        }
        
        if(erros.length > 0){
            res.render('forms/form_register_master', {erros: erros})
        }
    } 
}