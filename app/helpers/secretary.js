
module.exports = {

    secretary: function(req, res,  next){
        if(req.isAuthenticated()){
            return next();
        }
        console.log('')
        req.flash('error_msg', 'Acesso de Recepcionista')
        res.redirect('/')
    }
}