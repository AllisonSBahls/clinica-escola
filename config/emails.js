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
            from: 'clinschool@hotmail.com',
            to: users[k].email,
            subject: 'ClinSchool - Consulta Marcada',
            text: 'Olá, estamos entrando em contato para lembrar sobre a consulta marcada para o dia ' + moment(consultas[k].dateStart).format('DD/MM/YYYY') +' ás '+ moment(consultas[k].dateStart).format('HH:mm') +'. Escolha uma das opções abaixo para confirmar',
            html: '<p>Olá, estamos entrando em contato para lembrar sobre a consulta marcada para o dia ' + moment(consultas[k].dateStart).format('DD/MM/YYYY') +' ás '+ moment(consultas[k].dateStart).format('HH:mm') +'. confirmar</p><p>Caso deseje cancelar a consulta ligue para o número (69)3003-0001</p>'

        }
            //Configuração do servidor de email
            var transporter = nodemailer.createTransport({
                service: 'Hotmail',
                auth: {
                    user: 'clinschool@hotmail.com',
                    pass: '$uportE99',
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
    setInterval(sendEmail, 64800000)
}

async function sendConsultEmail(emailDestinatario) {

                //Mensagem a ser enviada
            const email = {
            from: 'clinschool@hotmail.com',
            to: emailDestinatario,
            subject: 'ClinSchool - Consulta Confirmada',
            text: 'Olá, A clínica aceitou a sua solicitação de agendamento feito no dia',
            html: '<p>Olá, A clínica aceitou a sua solicitação de agendamento feito no dia. Em caso de dúvidas ligue para o número (69)3003-0001</p>'

        }
            //Configuração do servidor de email
            var transporter = nodemailer.createTransport({
                service: 'Hotmail',
                auth: {
                    user: 'clinschool@hotmail.com',
                    pass: '$uportE99',
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
    


module.exports = {
    sendEmail,
    sendConsultEmail
}