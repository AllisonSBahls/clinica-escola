const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/model/User');
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const Patient = require('../app/model/Patient');

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy({
            callbackURL: "/auth/google/redirect",
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
        }, async (accessToken, refreshToken, profile, done) => {
            const currentUser = await User.findUser(profile.id)
                if (!currentUser) {
                    User.insertUserAuth(profile.id, profile.emails[0].value,).then((user) => {
                        done(null, user);
                        Patient.insertPatientAuth(
                            profile.displayName,
                            user.id,
                        ).then(() => {
                        }).catch((err) => {
                            console.log(err)
                        });
                    }).catch((err) => {
                        console.log(err)
                    });
                 } else {
                    return done(null, currentUser);
                }
        })
    )
    
    passport.use('local-signin',
        new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, function (req, email, password, done) {

            var Users = User;
            var isValidPassword = function (userpass, password) {
                return bcrypt.compareSync(password, userpass);
            }
            User.findOne({ where: { email: email } }).then(function (user) {
                if (!user) {
                    return done(null, false, { message: 'Esta conta não existe' });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, { message: 'Senha Inválida' });
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
