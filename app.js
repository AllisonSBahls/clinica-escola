const express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); 
const permissao = require('./app/routes/permissao');
const secretary = require('./app/routes/secretary');
const master = require('./app/routes/master');
const trainee = require('./app/routes/trainee');
const patient = require('./app/routes/patient');
const users = require('./app/routes/user');
const reports = require('./app/routes/reports');
const consultation = require('./app/routes/consultation');
const index = require('./app/routes/index');
const wait = require('./app/routes/wait');
const test = require('./app/routes/test');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/auth')(passport);

const app = express();

//Sessões
app.use(session({
	secret: '****clinicasecretschool***',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash("error")
	res.locals.user = req.user || null;
	next();
});

//Templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './app/views'));

//Globais
app.locals.moment = require('moment');

//Arquivos estáticos
app.use(express.static('./app/public'));

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.use('/', index);
app.use('/permissao', permissao);
app.use('/relatorios', reports);
app.use('/recepcionista', secretary);
app.use('/supervisor', master);
app.use('/estagiario', trainee);
app.use('/waits', wait);
app.use('/paciente', patient);
app.use('/user', users);
app.use('/consultation', consultation);
app.use('/test', test);
//Rotas não encontradas
// app.use(function(req, res, next) {
// 	var err = new Error('Página não encontrada');
// 	err.status = 404;
// 	next(err);
//   });

//Inicialização do Servidor
app.listen(4000, function(){
	console.log('Servidor ON');
});