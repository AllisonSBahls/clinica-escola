module.exports = {

    admin: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
                return next();
            } else {
                req.flash('error_msg', 'Erro por favor consulte o administrador')
                res.redirect('/pagenotfound')
            }
        } else {
            req.flash('error_msg', 'Erro por favor consulte o administrador')
            res.redirect('/pagenotfound')
        }
    },

    secretary: function(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.NivelPermissaoId == 2) {
                return next();
            } else {
                req.flash('error_msg', 'Erro por favor consulte o administrador')
                res.redirect('/pagenotfound')
            }
        } else {
            req.flash('error_msg', 'Erro por favor consulte o administrador')
            res.redirect('/pagenotfound')
        }
    },
    users: function(req, res, next) {
        if (req.isAuthenticated()) {
                return next();            
        } else {
            req.flash('error_msg', 'Erro por favor consulte o administrador')
            res.redirect('/pagenotfound')
        }
    },

    master: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.NivelPermissaoId == 1) {
                return next();
            } else {
                req.flash('error_msg', 'Erro por favor consulte o administrador')
                res.redirect('/pagenotfound')
            }
        } else {
            req.flash('error_msg', 'Erro por favor consulte o administrador')
            res.redirect('/pagenotfound')
        }
    },

    trainee: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.NivelPermissaoId == 3) {
                return next();
            } else {
                req.flash('error_msg', 'Erro por favor consulte o administrador')
                res.redirect('/pagenotfound')
            }
        } else {
            req.flash('error_msg', 'Erro por favor consulte o administrador')
            res.redirect('/pagenotfound')
        }

    },

    patient: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.NivelPermissaoId == 4) {
                return next();
            } else {
                req.flash('error_msg', 'Erro por favor consulte o administrador')
                res.redirect('/pagenotfound')
            }
        } else {
            req.flash('error_msg', 'Erro por favor consulte o administrador')
            res.redirect('/pagenotfound')

        }
    }
}