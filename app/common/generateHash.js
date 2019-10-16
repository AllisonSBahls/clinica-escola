const bcrypt = require('bcryptjs');

module.exports = {

    generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    },

    validPassword: function (passwordCurrent, password) {
        return bcrypt.compareSync(passwordCurrent, password);
    }
    
} 