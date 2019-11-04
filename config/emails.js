var nodemailer = require('nodemailer');
var User = require('../app/model/User');
var Consultation = require('../app/model/Consultations');
const moment = require('moment');

async function sendEmail() {

    var StartDay = moment.utc();
    StartDay.set({ hour: 00, minute: 00, second: 00, millisecond: 00 })
    var endDay = moment.utc();
    endDay.add(1, 'days');
    endDay.set({ hour: 23, minute: 59, second: 59, millisecond: 00 })
    //Verifica se esta dois dias ante da consulta
    const consultas = await Consultation.searchConsultSendEmail(StartDay, endDay);
        
    //Pega os emails dos usuários das consultas
    for(i = 0; i < consultas.length; i++) {
        id = consultas[i].consultPatient.userPatientId;
        users =  await User.searchEmailUser(id)
        for(k = 0; k < users.length; k++) {
            //Mensagem a ser enviada
            const email = {
            from: 'allison_sousa_bahls@hotmail.com',
            to: users[k].email,
            subject: 'SchoolClinc - Consulta Marcada',
            text: 'Olá, estamos entrando em contato para lembrar sobre a consulta marcada para o dia ' + moment(consultas[k].dateStart).format('DD/MM/YYYY') +' ás '+ moment(consultas[k].dateStart).format('HH:mm') +'. Escolha uma das opções abaixo para confirmar',
            html: '<p>Olá, estamos entrando em contato para lembrar sobre a consulta marcada para o dia ' + moment(consultas[k].dateStart).format('DD/MM/YYYY') +' ás '+ moment(consultas[k].dateStart).format('HH:mm') +'. Escolha uma das opções abaixo para confirmar</p>'

        }
            //Configuração do servidor de email
            var transporter = nodemailer.createTransport({
                service: 'Hotmail',
                auth: {
                    user: 'allison_sousa_bahls@hotmail.com',
                    pass: 'allison2121997',
            }
            });
            
            // Envia o Email

            transporter.sendMail(email, function(err, info){
                if(err){
                    return console.log(err);
                }else{
                    return console.log('Mensagem enviada com sucesso');
                }
            });
        }
    }
    setInterval(sendEmail, 900000)
}


module.exports = {
    sendEmail
}