const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const Patient = require('../app/model/Patient');
const User = require('../app/model/User');



passport.use(
    new  GoogleStrategy({
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret:keys.google.clientSecret, 
    }, async (accessToken, refreshToken, profile, done) =>{
        await User.findUser(profile.id).then((currentUser)=>{
            if(currentUser.length > 0){
                done(null, currentUser);
            }else{
                Patient.insertPatientAuth(
                    profile.id,
                    profile.emails[0].value,
                    profile.displayName,
                ).then((newUser) => {
                    done(null, newUser);
                }).catch((err) => {
                    console.log(err)
                });
            }
        });
    })
)


passport.serializeUser(function (user, done) {
    console.log(user.id)
    done(null, user.id);
});
// used to deserialize the user
passport.deserializeUser((id, done) => {
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
