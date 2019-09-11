module.exports = {

    admin: function(req, res,  next){
        if(req.isAuthenticated() && req.user.NivelPermissaoId == 2 || req.user.NivelPermissaoId ==  1){
            return next();
        }
        console.log('')
        req.flash('error_msg', 'Erro por faor consulte o administrador')
        res.redirect('/dashboard')
    },
    
    
    secretary: function(req, res,  next){
        if(req.isAuthenticated() && req.user.NivelPermissaoId == 2){
            return next();
        }
        console.log('')
        req.flash('error_msg', 'Erro por faor consulte o administrador')
        res.redirect('/dashboard')
    },

    master: function(req, res,  next){
        if(req.isAuthenticated() && req.user.NivelPermissaoId == 1){
            return next();
        }
        console.log('')
        req.flash('error_msg', 'Erro por faor consulte o administrador')
        res.redirect('/dashboard')
    },
    
    trainee: function(req, res,  next){
        if(req.isAuthenticated() && req.user.NivelPermissaoId == 3){
            return next();
        }
        console.log('')
        req.flash('error_msg', 'Erro por faor consulte o administrador')
        res.redirect('/dashboard')
    },
    
    patient: function(req, res,  next){
        if(req.isAuthenticated() && req.user.NivelPermissaoId == 4){
            return next();
        }
        console.log('')
        req.flash('error_msg', 'Erro por faor consulte o administrador')
        res.redirect('/dashboard')
    }
}