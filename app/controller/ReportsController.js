const Report = require('../model/Reports');
const Trainee = require('../model/Trainee');
const Master = require('../model/Master');
const moment = require('moment');
const crypto = require('crypto');

var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;

var crypt = new Crypt();
var rsa = new RSA();

var entropy = 'Random string, integer or float';
var crypt = new Crypt({ entropy: entropy });
var rsa = new RSA({ entropy: entropy });

var crypt = new Crypt({ md: 'sha512' });


class ReportController {

    async report(req, res) {
        const traineeProfile = await Trainee.findOne({
            where: { userTraineeId: req.user.id }
        });
        const masterProfile = await Master.findOne({
            where: { userMasterId: req.user.id }
        });
        const masters = await Master.findAll();
        return res.render("forms/form_report", { masterProfile: masterProfile, traineeProfile: traineeProfile, masters: masters });
    }

    async report_save(req, res) {
         let reportCrypt = req.body.report; 
        // const cipher = crypto.createCipher(alg, pwd)
        // const crypted = cipher.update(reportCrypt, 'utf8', 'hex')
        // console.log(crypted)
        // const decipher = crypto.createDecipher(alg, pwd)
        // const reportDecrypt = decipher.update(crypted, 'hex', 'utf8')
        // console.log(reportDecrypt)

        // var decryptStringWithRsaPrivateKey = function (toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
        //     var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
        //     var privateKey = fs.readFileSync(absolutePath, "utf8");
        //     var buffer = new Buffer(toDecrypt, "base64");
        //     var decrypted = crypto.privateDecrypt(privateKey, buffer);
        //     return decrypted.toString("utf8");
        // };

        // module.exports = {
        //     encryptStringWithRsaPublicKey: encryptStringWithRsaPublicKey,
        //     decryptStringWithRsaPrivateKey: decryptStringWithRsaPrivateKey
        // }

        let traineeProfile = await Trainee.findOne({
            where: { userTraineeId: req.user.id }
        });

        rsa.generateKeyPair(function(keyPair) {
            var publicKey = keyPair.publicKey;
            var privateKey = keyPair.privateKey;
        
            var encrypted = crypt.encrypt(publicKey, reportCrypt);
            var decrypted = crypt.decrypt(privateKey, encrypted);
            console.log(decrypted)
            Report.create({
            reports: encrypted,
            dateSend: moment(),
            reportTraineeId: traineeProfile.id,
            reportMasterId: req.body.masterId,
        }).then(function () {
            res.redirect('/dashboard');
        }).catch(function (erro) {
            res.send("erro" + erro);
        })
    });

    }
}

module.exports = ReportController;