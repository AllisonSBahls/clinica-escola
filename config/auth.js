const LocalStrategy = require('passport-local').Strategy;
const Patient = require('../app/model/Patient');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
    passport.use('local-signin',
        new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
            Patient.findAll ({
                where: { email: email }
            }).then((patient) => {
                bcrypt.compare(patient.password, password, (err, isMatch) => {
                    if (isMatch) {
                        return done(null, patient);
                    } else {
                        console.log(password);
                        console.log(Patient.password);
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            });
        })
    );

    passport.serializeUser(function (patient, done) {
        done(null, patient);
    });

    passport.deserializeUser(function(patient, done) {
        done(null, patient);
});
};
