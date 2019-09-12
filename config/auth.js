const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/model/User');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {

    passport.use('local-signin',
        new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, function (req, email, password, done) {

            var Users = User;
            var isValidPassword = function (userpass, password) {
                return bcrypt.compareSync(password, userpass);
            }
            User.findOne({ where: { email: email } }).then(function (user) {
                if (!user) {
                    return done(null, false, { message: 'Email ou Senha Inválidas' });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, { message: 'Email ou Senha Inválidas' });
                } else {
                    return done(null, user);
                }
            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, { message: 'Something went wrong with your Signin' });
            });
        }
        ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });


    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findOne({
            where: { id: id }
        }).then(function (user) {
            if (user) {
                done(null, user);
            }
            else {
                done(user.errors, null);
            }
        });

    });
};
