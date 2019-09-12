module.exports = {

    admin: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.NivelPermissaoId == 1 || req.user.NivelPermissaoId == 2) {
                return next();
            } else {
                req.flash('error_msg', 'Erro por favor consulte o administrador')
                res.redirect('/errornotfound')
            }
        } else {
            req.flash('error_msg', 'Erro por favor consulte o administrador')
            res.redirect('/errornotfound')
        }
    },

    function(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.NivelPermissaoId == 2) {
                return next();
            } else {
                req.flash('error_msg', 'Erro por favor consulte o administrador')
                res.redirect('/errornotfound')
            }
        } else {
            req.flash('error_msg', 'Erro por favor consulte o administrador')
            res.redirect('/errornotfound')
        }
    },

    master: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.NivelPermissaoId == 1) {
                return next();
            } else {
                req.flash('error_msg', 'Erro por favor consulte o administrador')
                res.redirect('/errornotfound')
            }
        } else {
            req.flash('error_msg', 'Erro por favor consulte o administrador')
            res.redirect('/errornotfound')
        }
    },

    trainee: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.NivelPermissaoId == 3) {
                return next();
            } else {
                req.flash('error_msg', 'Erro por favor consulte o administrador')
                res.redirect('/errornotfound')
            }
        } else {
            req.flash('error_msg', 'Erro por favor consulte o administrador')
            res.redirect('/errornotfound')
        }

    },

    patient: function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.NivelPermissaoId == 4) {
                return next();
            } else {
                req.flash('error_msg', 'Erro por favor consulte o administrador')
                res.redirect('/errornotfound')
            }
        } else {
            req.flash('error_msg', 'Erro por favor consulte o administrador')
            res.redirect('/errornotfound')

        }
    }
}