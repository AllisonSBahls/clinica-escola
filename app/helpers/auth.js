module.exports = {

    secretary: function(req, res,  next){
        if(req.isAuthenticated() && req.user.NivelPermissaoId == 2){
            return next();
        }
        console.log('')
        req.flash('error_msg', 'Acesso de Recepcionista')
        res.redirect('/')
    },
    
    master: function(req, res,  next){
        if(req.isAuthenticated() && req.user.NivelPermissaoId == 1){
            return next();
        }
        console.log('')
        req.flash('error_msg', 'Acesso de Recepcionista')
        res.redirect('/')
    },
    
    trainee: function(req, res,  next){
        if(req.isAuthenticated() && req.user.NivelPermissaoId == 3){
            return next();
        }
        console.log('')
        req.flash('error_msg', 'Acesso de Recepcionista')
        res.redirect('/')
    },
    
    patient: function(req, res,  next){
        if(req.isAuthenticated() && req.user.NivelPermissaoId == 4){
            return next();
        }
        console.log('')
        req.flash('error_msg', 'Acesso de Recepcionista')
        res.redirect('/')
    }
}