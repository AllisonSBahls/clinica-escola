const localStrategy = require("passport-local").Strategy
var connection = application.config.dbConnection();

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'emailRecepcionista'}, (emailRecepcionista, senha, done) => {
        connection.query('SELECT emailRecepcionista FROM recepcionistas WHERE emailRecepcionista = ' + emailRecepcionista, function(error, result){
            if (error){
                return done(null, false, {message: "Esta conta não existe"})
            }
        });
    }))
}